import Link from "next/link";
import Container from "@/components/Container";

export default function CallToAction() {
  return (
    <section className="border-t border-border bg-muted py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Ready to Ignite Your Next Project?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Let&apos;s talk about how Spaarke can help you build something
            extraordinary.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
