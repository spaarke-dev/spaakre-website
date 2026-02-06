"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import InlineAlert from "@/components/InlineAlert";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function EarlyReleaseForm({
  recaptchaSiteKey,
}: {
  recaptchaSiteKey: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  function validate(): string | null {
    if (!name.trim() || name.trim().length > 100) {
      return "Please enter your name.";
    }
    const emailTrimmed = email.trim();
    if (
      !emailTrimmed ||
      emailTrimmed.length < 3 ||
      emailTrimmed.length > 254 ||
      !EMAIL_RE.test(emailTrimmed)
    ) {
      return "Please enter a valid email address.";
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

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
        message="Thanks for your interest — we will be in touch shortly!"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {status === "error" && errorMessage && (
        <InlineAlert variant="error" message={errorMessage} />
      )}

      <div className="flex gap-2">
        <input
          type="text"
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block min-w-0 flex-[1.4] rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-label="Join the Early Release"
          className="flex-shrink-0 rounded-lg bg-primary p-2.5 transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
        >
          {status === "submitting" ? (
            <svg
              className="h-5 w-5 animate-spin text-primary-foreground"
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
          ) : (
            <Image
              src="/images/box-arrow-45-degree.svg"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 brightness-0 invert"
              aria-hidden="true"
            />
          )}
        </button>
      </div>

      {recaptchaSiteKey && (
        <div className="flex justify-center">
          <ReCAPTCHA ref={recaptchaRef} sitekey={recaptchaSiteKey} />
        </div>
      )}
    </form>
  );
}
