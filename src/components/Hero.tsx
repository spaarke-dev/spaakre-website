import Link from "next/link";
import Container from "@/components/Container";

export default function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Igniting Innovation
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We help businesses spark new ideas and turn them into reality.
            From strategy to execution, Spaarke is your partner in building
            what&apos;s next.
          </p>
          <div className="mt-10">
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
