import type { Metadata } from "next";
import EarlyReleaseForm from "@/components/EarlyReleaseForm";

export const metadata: Metadata = {
  title: "Spaarke | Igniting Innovation",
  description:
    "Join the Spaarke Early Release Program. Be the first to experience our platform.",
};

export default function Home() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-sm flex-col items-center gap-10 text-center">
        {/* Spaarke brand mark */}
        <div>
          <h1
            className="text-5xl font-bold tracking-tight sm:text-6xl"
            style={{
              background:
                "linear-gradient(135deg, #000BFF, #00F7FF, #1AFF00, #FFD200, #FF4600)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            SPAARKE
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Igniting Innovation
          </p>
        </div>

        {/* Early Release signup */}
        <div className="w-full">
          <h2 className="mb-6 text-lg font-semibold text-foreground">
            Join the Early Release Program
          </h2>
          <EarlyReleaseForm />
        </div>
      </div>
    </div>
  );
}
