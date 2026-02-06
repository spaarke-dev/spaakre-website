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
    <div className="flex min-h-[75vh] items-center justify-center px-4 pb-24 pt-8">
      <div className="flex w-full max-w-md flex-col items-center gap-16 text-center">
        {/* Spaarke logo */}
        <Image
          src="/images/spaarke-logo-full.svg"
          alt="Spaarke"
          width={560}
          height={170}
          priority
          className="h-auto w-[28rem] sm:w-[32rem]"
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
