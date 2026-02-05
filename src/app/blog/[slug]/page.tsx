import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Container from "@/components/Container";
import PostHeader from "@/components/PostHeader";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { generateBlogPostMetadata, generateBlogJsonLd } from "@/lib/seo";

const siteUrl = process.env.SITE_URL ?? "https://www.spaarke.com";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return generateBlogPostMetadata(post, siteUrl);
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content: mdxContent } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
  });

  const jsonLd = generateBlogJsonLd(post, siteUrl);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <article className="mx-auto max-w-2xl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <PostHeader post={post} />
          <div className="prose prose-neutral max-w-none dark:prose-invert">
            {mdxContent}
          </div>
        </article>
      </Container>
    </section>
  );
}
