import type { Metadata } from "next";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";

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
            Have a question or want to work together? Fill out the form below
            and we&apos;ll get back to you as soon as possible.
          </p>

          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
