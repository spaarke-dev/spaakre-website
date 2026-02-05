import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Spaarke team.",
};

export default function Contact() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Contact form coming soon. In the meantime, reach us at{" "}
            <a
              href="mailto:hello@spaarke.com"
              className="text-primary underline hover:text-primary/80"
            >
              hello@spaarke.com
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
