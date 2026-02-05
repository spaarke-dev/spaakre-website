import type { Metadata } from "next";
import Container from "@/components/Container";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug.replace(/-/g, " "),
    description: `Read the blog post: ${slug.replace(/-/g, " ")}`,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <article className="prose mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {slug.replace(/-/g, " ")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            This post is not yet available.
          </p>
        </article>
      </Container>
    </section>
  );
}
