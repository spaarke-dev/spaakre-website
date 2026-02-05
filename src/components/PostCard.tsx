"use client";

import Link from "next/link";
import { CalendarLtr20Regular } from "@fluentui/react-icons";
import type { BlogPostMeta } from "@/lib/blog";
import TagPills from "@/components/TagPills";

type PostCardProps = {
  post: BlogPostMeta;
};

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group rounded-xl border border-border bg-background p-6 transition-colors hover:border-foreground/20">
      <Link href={`/blog/${post.slug}`} className="block">
        <h2 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary">
          {post.title}
        </h2>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarLtr20Regular className="h-4 w-4" />
          <time dateTime={post.date}>{formattedDate}</time>
        </div>

        <p className="mt-3 text-muted-foreground">{post.description}</p>

        <div className="mt-4">
          <TagPills tags={post.tags} />
        </div>
      </Link>
    </article>
  );
}
