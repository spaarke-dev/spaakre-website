import { setup, defaultClient } from "applicationinsights";

let initialized = false;

function ensureInitialized() {
  if (initialized) return;

  const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;
  if (!connectionString) {
    return;
  }

  setup(connectionString)
    .setAutoCollectRequests(true)
    .setAutoCollectExceptions(true)
    .start();

  initialized = true;
}

/** Track a custom event with sanitized properties (no PII). */
export function trackEvent(
  name: string,
  properties?: Record<string, string>,
) {
  ensureInitialized();
  if (defaultClient) {
    defaultClient.trackEvent({ name, properties });
  }
}

/** Track an exception with context (no PII in properties). */
export function trackException(
  error: Error,
  properties?: Record<string, string>,
) {
  ensureInitialized();
  if (defaultClient) {
    defaultClient.trackException({ exception: error, properties });
  }
}
