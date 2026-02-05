"use client";

import { useState } from "react";
import { Send24Regular } from "@fluentui/react-icons";
import FormField from "@/components/FormField";
import InlineAlert from "@/components/InlineAlert";

const REASON_OPTIONS = ["", "Demo", "Partnership", "Support", "Other"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateLocally(fields: {
  name: string;
  email: string;
  message: string;
}): FieldErrors | null {
  const errors: FieldErrors = {};

  if (!fields.name.trim() || fields.name.trim().length > 100) {
    errors.name = "Name is required (1-100 characters).";
  }

  const emailTrimmed = fields.email.trim();
  if (
    !emailTrimmed ||
    emailTrimmed.length < 3 ||
    emailTrimmed.length > 254 ||
    !EMAIL_RE.test(emailTrimmed)
  ) {
    errors.email = "A valid email address is required.";
  }

  if (!fields.message.trim() || fields.message.trim().length > 5000) {
    errors.message = "Message is required (1-5000 characters).";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Client-side validation
    const localErrors = validateLocally({ name, email, message });
    if (localErrors) {
      setFieldErrors(localErrors);
      return;
    }
    setFieldErrors({});

    setStatus("submitting");
    setErrorMessage("");

    try {
      // Read honeypot from the form element
      const formData = new FormData(e.currentTarget);
      const hp = (formData.get("hp") as string) ?? "";

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          reason: reason || undefined,
          message: message.trim(),
          hp,
        }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setStatus("error");
        setErrorMessage("Too many submissions. Please try again later.");
        return;
      }

      if (!res.ok || !data.ok) {
        if (data.error === "VALIDATION_ERROR" && data.fields) {
          setFieldErrors(data.fields as FieldErrors);
          setStatus("idle");
        } else {
          setStatus("error");
          setErrorMessage(
            "Something went wrong. Please try again or email us directly.",
          );
        }
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Unable to reach the server. Please check your connection and try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <InlineAlert
        variant="success"
        message="Thank you! We'll be in touch within 1-2 business days."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {status === "error" && errorMessage && (
        <InlineAlert variant="error" message={errorMessage} />
      )}

      <FormField
        name="name"
        label="Name"
        required
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={fieldErrors.name}
      />

      <FormField
        name="email"
        label="Email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email}
      />

      <FormField
        name="company"
        label="Company"
        placeholder="Your company (optional)"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <FormField
        name="reason"
        label="Reason for Contact"
        type="select"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      >
        <option value="">Select a reason (optional)</option>
        {REASON_OPTIONS.filter(Boolean).map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </FormField>

      <FormField
        name="message"
        label="Message"
        type="textarea"
        required
        rows={5}
        placeholder="How can we help?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        error={fieldErrors.message}
      />

      {/* Honeypot field - hidden from real users */}
      <div className="absolute left-[-9999px] opacity-0" aria-hidden="true">
        <label htmlFor="hp">Do not fill this in</label>
        <input type="text" id="hp" name="hp" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending...
          </>
        ) : (
          <>
            <Send24Regular aria-hidden="true" className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
