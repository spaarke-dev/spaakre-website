import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateContactForm, type ContactFormData } from "@/lib/contact";
import { getIpHash } from "@/lib/ip-hash";
import { checkRateLimit } from "@/lib/rate-limit";
import { saveContactSubmission } from "@/lib/storage";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ContactFormData>;

    // Normalize inputs
    const data: ContactFormData = {
      name: (body.name ?? "").trim(),
      email: (body.email ?? "").trim(),
      company: (body.company ?? "").trim() || undefined,
      reason: (body.reason ?? "").trim() || undefined,
      message: (body.message ?? "").trim(),
      hp: (body.hp ?? "").trim() || undefined,
    };

    // Honeypot check - bots fill this in; silently accept
    if (data.hp) {
      return NextResponse.json({ ok: true });
    }

    // Rate limiting
    const ipHash = await getIpHash();
    const rateResult = checkRateLimit(ipHash);
    if (!rateResult.allowed) {
      return NextResponse.json(
        { ok: false, error: "RATE_LIMITED" },
        {
          status: 429,
          headers: { "Retry-After": String(rateResult.retryAfter) },
        },
      );
    }

    // Validation
    const validation = validateContactForm(data);
    if (!validation.valid) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", fields: validation.fields },
        { status: 400 },
      );
    }

    // Persist to Azure Table Storage first
    await saveContactSubmission(data, ipHash);

    // Send email notification (failure does not affect user response)
    sendContactNotification(data).catch((err) => {
      console.error("[contact] Email notification failed:", err);
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR" },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}

export function PUT() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}

export function DELETE() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}
