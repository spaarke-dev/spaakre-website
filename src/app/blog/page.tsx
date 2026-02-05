import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights and updates from the Spaarke team.",
};

export default function BlogIndex() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Posts coming soon.
        </p>
      </Container>
    </section>
  );
}
