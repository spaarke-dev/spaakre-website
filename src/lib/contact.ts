export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  reason?: string;
  message: string;
  hp?: string;
}

const VALID_REASONS = ["Demo", "Partnership", "Support", "Other"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ValidationSuccess = { valid: true };
type ValidationFailure = { valid: false; fields: Record<string, string> };
export type ValidationResult = ValidationSuccess | ValidationFailure;

export function validateContactForm(data: ContactFormData): ValidationResult {
  const fields: Record<string, string> = {};

  const name = data.name?.trim() ?? "";
  if (!name || name.length > 100) {
    fields.name = "Name is required (1-100 characters).";
  }

  const email = data.email?.trim() ?? "";
  if (!email || email.length < 3 || email.length > 254 || !EMAIL_RE.test(email)) {
    fields.email = "A valid email address is required.";
  }

  const message = data.message?.trim() ?? "";
  if (!message || message.length > 5000) {
    fields.message = "Message is required (1-5000 characters).";
  }

  if (
    data.reason !== undefined &&
    data.reason !== "" &&
    !VALID_REASONS.includes(data.reason as (typeof VALID_REASONS)[number])
  ) {
    fields.reason = "Invalid reason selected.";
  }

  if (Object.keys(fields).length > 0) {
    return { valid: false, fields };
  }

  return { valid: true };
}
