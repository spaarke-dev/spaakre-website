const WINDOW_MS = 60_000; // 1 minute

/** Map of IP hash -> array of request timestamps */
const submissions = new Map<string, number[]>();

function getMaxPerMinute(): number {
  const env = process.env.RATE_LIMIT_PER_MINUTE;
  if (env) {
    const parsed = parseInt(env, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return 5;
}

type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfter: number };

export function checkRateLimit(ipHash: string): RateLimitResult {
  const now = Date.now();
  const maxPerMinute = getMaxPerMinute();

  // Get existing timestamps and remove expired ones
  const timestamps = (submissions.get(ipHash) ?? []).filter(
    (ts) => now - ts < WINDOW_MS,
  );

  if (timestamps.length >= maxPerMinute) {
    // Calculate when the oldest relevant request will expire
    const oldest = timestamps[timestamps.length - maxPerMinute];
    const retryAfter = Math.ceil((oldest + WINDOW_MS - now) / 1000);
    // Update stored timestamps (pruned)
    submissions.set(ipHash, timestamps);
    return { allowed: false, retryAfter: Math.max(retryAfter, 1) };
  }

  // Allow and record
  timestamps.push(now);
  submissions.set(ipHash, timestamps);
  return { allowed: true };
}

// Periodic cleanup to prevent memory leaks
// Runs every 60 seconds and removes entries with no recent activity
if (typeof globalThis !== "undefined") {
  const CLEANUP_INTERVAL_MS = 60_000;

  const cleanup = () => {
    const now = Date.now();
    for (const [key, timestamps] of submissions.entries()) {
      const active = timestamps.filter((ts) => now - ts < WINDOW_MS);
      if (active.length === 0) {
        submissions.delete(key);
      } else {
        submissions.set(key, active);
      }
    }
  };

  // Use setInterval but store on globalThis to avoid duplicate timers in dev mode
  const globalObj = globalThis as unknown as {
    __rateLimitCleanupTimer?: ReturnType<typeof setInterval>;
  };

  if (!globalObj.__rateLimitCleanupTimer) {
    globalObj.__rateLimitCleanupTimer = setInterval(
      cleanup,
      CLEANUP_INTERVAL_MS,
    );
    // Unref so the timer doesn't prevent process exit
    if (typeof globalObj.__rateLimitCleanupTimer === "object" && "unref" in globalObj.__rateLimitCleanupTimer) {
      (globalObj.__rateLimitCleanupTimer as NodeJS.Timeout).unref();
    }
  }
}
