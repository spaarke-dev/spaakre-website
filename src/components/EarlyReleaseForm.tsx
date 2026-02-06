"use client";

import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import FormField from "@/components/FormField";
import InlineAlert from "@/components/InlineAlert";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function EarlyReleaseForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
  }>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  function validateLocally(): boolean {
    const errors: { name?: string; email?: string } = {};

    if (!name.trim() || name.trim().length > 100) {
      errors.name = "Name is required (1-100 characters).";
    }

    const emailTrimmed = email.trim();
    if (
      !emailTrimmed ||
      emailTrimmed.length < 3 ||
      emailTrimmed.length > 254 ||
      !EMAIL_RE.test(emailTrimmed)
    ) {
      errors.email = "A valid email address is required.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateLocally()) return;

    const captchaToken = recaptchaRef.current?.getValue();
    if (!captchaToken) {
      setStatus("error");
      setErrorMessage("Please complete the CAPTCHA verification.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/early-release", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          captchaToken,
        }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setStatus("error");
        setErrorMessage("Too many submissions. Please try again later.");
        recaptchaRef.current?.reset();
        return;
      }

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(
          data.error === "CAPTCHA_FAILED"
            ? "CAPTCHA verification failed. Please try again."
            : "Something went wrong. Please try again.",
        );
        recaptchaRef.current?.reset();
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Unable to reach the server. Please check your connection and try again.",
      );
      recaptchaRef.current?.reset();
    }
  }

  if (status === "success") {
    return (
      <InlineAlert
        variant="success"
        message="You're on the list! We'll notify you when early access is available."
      />
    );
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {status === "error" && errorMessage && (
        <InlineAlert variant="error" message={errorMessage} />
      )}

      <FormField
        name="early-name"
        label="Name"
        required
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={fieldErrors.name}
      />

      <FormField
        name="early-email"
        label="Email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email}
      />

      {siteKey && (
        <div className="flex justify-center">
          <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} />
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
      >
        {status === "submitting" ? (
          <span className="inline-flex items-center gap-2">
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
            Joining...
          </span>
        ) : (
          "Join the Early Release"
        )}
      </button>
    </form>
  );
}
