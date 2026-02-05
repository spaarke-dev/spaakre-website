import { createHash } from "crypto";
import { headers } from "next/headers";

/**
 * Extract the client IP from x-forwarded-for (Azure SWA forwards this)
 * and return a SHA-256 hash for privacy.
 */
export async function getIpHash(): Promise<string> {
  const hdrs = await headers();
  const forwarded = hdrs.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  return hashIp(ip);
}

export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}
