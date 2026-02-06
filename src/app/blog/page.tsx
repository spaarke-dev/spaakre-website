import type { Metadata } from "next";
import Container from "@/components/Container";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/blog";

const siteUrl = process.env.SITE_URL ?? "https://www.spaarke.com";

export const metadata: Metadata = {
  title: "Library",
  description: "Insights and updates from the Spaarke team.",
  openGraph: {
    title: "Library | Spaarke",
    description: "Insights and updates from the Spaarke team.",
    url: `${siteUrl}/blog`,
    siteName: "Spaarke",
    type: "website",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Library
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Insights and updates from the Spaarke team.
          </p>

          {posts.length === 0 ? (
            <p className="mt-12 text-muted-foreground">
              No posts yet. Check back soon!
            </p>
          ) : (
            <div className="mt-12 space-y-6">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
