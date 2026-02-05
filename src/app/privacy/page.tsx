import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Spaarke privacy policy — how we collect and use your data.",
};

export default function Privacy() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="prose mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Privacy policy content coming soon.
          </p>
        </div>
      </Container>
    </section>
  );
}
