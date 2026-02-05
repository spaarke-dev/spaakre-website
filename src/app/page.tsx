import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Spaarke | Igniting Innovation",
  description:
    "Spaarke helps businesses spark new ideas and turn them into reality.",
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Igniting Innovation
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We help businesses spark new ideas and turn them into reality.
            </p>
          </div>
        </Container>
      </section>

      {/* Video section placeholder */}
      <section className="border-t border-border bg-muted py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              See Spaarke in Action
            </h2>
            <p className="mt-4 text-muted-foreground">Video coming soon.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
