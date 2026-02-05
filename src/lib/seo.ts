import type { Metadata } from "next";
import type { BlogPostMeta } from "@/lib/blog";

/* ------------------------------------------------------------------ */
/*  Blog Post Metadata (Open Graph, Twitter, canonical)                */
/* ------------------------------------------------------------------ */

export function generateBlogPostMetadata(
  post: BlogPostMeta,
  siteUrl: string,
): Metadata {
  const url = `${siteUrl}/blog/${post.slug}`;
  // NOTE: Replace /images/og-default.png with an actual OG image.
  // A 1200x630 PNG should be placed at public/images/og-default.png.
  const ogImage = post.heroImage ?? `${siteUrl}/images/og-default.png`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "Spaarke",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  JSON-LD BlogPosting schema                                         */
/* ------------------------------------------------------------------ */

export type BlogPostingJsonLd = {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  description: string;
  datePublished: string;
  author: {
    "@type": "Person" | "Organization";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
  image?: string;
  keywords?: string;
};

export function generateBlogJsonLd(
  post: BlogPostMeta,
  siteUrl: string,
): BlogPostingJsonLd {
  const url = `${siteUrl}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Spaarke",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(post.heroImage ? { image: post.heroImage } : {}),
    ...(post.tags.length > 0 ? { keywords: post.tags.join(", ") } : {}),
  };
}
