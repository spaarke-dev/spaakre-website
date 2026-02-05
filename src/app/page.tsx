import Container from "@/components/Container";

export default function Home() {
  return (
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
  );
}
