import type { Metadata } from "next";
import Image from "next/image";
import EarlyReleaseForm from "@/components/EarlyReleaseForm";

export const metadata: Metadata = {
  title: "Spaarke | Igniting Innovation",
  description:
    "Join the Spaarke Early Release Program. Be the first to experience our platform.",
};

export default function Home() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-md flex-col items-center gap-10 text-center">
        {/* Spaarke logo */}
        <Image
          src="/images/spaarke-logo-full.svg"
          alt="Spaarke"
          width={280}
          height={85}
          priority
          className="h-auto w-56 sm:w-64"
        />

        {/* Early Release signup */}
        <div className="w-full">
          <h2 className="mb-5 text-lg font-semibold text-foreground">
            Join the Early Release Program
          </h2>
          <EarlyReleaseForm />
        </div>
      </div>
    </div>
  );
}
