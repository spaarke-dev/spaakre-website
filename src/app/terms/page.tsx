import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Spaarke terms of service and conditions of use.",
};

export default function Terms() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="prose mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Terms of service content coming soon.
          </p>
        </div>
      </Container>
    </section>
  );
}
