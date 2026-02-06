import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TableClient } from "@azure/data-tables";
import { randomBytes } from "crypto";
import { getIpHash } from "@/lib/ip-hash";
import { checkRateLimit } from "@/lib/rate-limit";
import { trackEvent, trackException } from "@/lib/logger";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TABLE_NAME = "EarlyReleaseSignups";

async function verifyCaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn("[early-release] RECAPTCHA_SECRET_KEY not set - skipping verification.");
    return true;
  }

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
  });
  const data = await res.json();
  return data.success === true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const captchaToken = (body.captchaToken ?? "").trim();

    // Rate limiting
    const ipHash = await getIpHash();
    const rateResult = checkRateLimit(ipHash);
    if (!rateResult.allowed) {
      trackEvent("early_release.rate_limited", { ipHash });
      return NextResponse.json(
        { ok: false, error: "RATE_LIMITED" },
        { status: 429, headers: { "Retry-After": String(rateResult.retryAfter) } },
      );
    }

    // Validate inputs
    if (!name || name.length > 100) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", message: "Name is required." },
        { status: 400 },
      );
    }
    if (!email || email.length < 3 || email.length > 254 || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", message: "Valid email is required." },
        { status: 400 },
      );
    }

    // Verify CAPTCHA
    if (!captchaToken) {
      return NextResponse.json(
        { ok: false, error: "CAPTCHA_FAILED" },
        { status: 400 },
      );
    }
    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      trackEvent("early_release.captcha_failed", { ipHash });
      return NextResponse.json(
        { ok: false, error: "CAPTCHA_FAILED" },
        { status: 400 },
      );
    }

    // Save to Azure Table Storage
    const connectionString = process.env.STORAGE_ACCOUNT_CONNECTION;
    if (connectionString) {
      const client = TableClient.fromConnectionString(connectionString, TABLE_NAME);
      const random = randomBytes(4).toString("hex");
      const rowKey = `${Date.now()}-${random}`;

      await client.createEntity({
        partitionKey: "signup",
        rowKey,
        name,
        email,
        ipHash,
        signedUpAt: new Date().toISOString(),
      });
    } else {
      console.warn("[early-release] STORAGE_ACCOUNT_CONNECTION not set - signup not persisted.");
    }

    trackEvent("early_release.success", { email: email.replace(/@.*/, "@***") });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[early-release] Unexpected error:", err);
    trackException(
      err instanceof Error ? err : new Error(String(err)),
      { step: "early-release" },
    );
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR" },
      { status: 500 },
    );
  }
}
