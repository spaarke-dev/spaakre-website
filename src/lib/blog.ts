import fs from "fs";
import path from "path";
import matter from "gray-matter";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  draft: boolean;
  heroImage?: string;
  content: string;
};

export type BlogPostMeta = Omit<BlogPost, "content">;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** Derive a URL-friendly slug from the MDX filename. */
function fileNameToSlug(fileName: string): string {
  // Remove .mdx extension, then strip leading date prefix (YYYY-MM-DD-)
  return fileName.replace(/\.mdx$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

/** Validate that required frontmatter fields are present. */
function validateFrontmatter(
  data: Record<string, unknown>,
  fileName: string,
): boolean {
  const required = ["title", "description", "date", "author", "tags"] as const;
  let valid = true;

  for (const field of required) {
    if (data[field] === undefined || data[field] === null) {
      console.warn(
        `[blog] Missing required frontmatter field "${field}" in ${fileName}`,
      );
      valid = false;
    }
  }

  return valid;
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

/** Return metadata for every published (non-draft) blog post, sorted by date descending. */
export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"));

  const posts: BlogPostMeta[] = [];

  for (const fileName of files) {
    const filePath = path.join(BLOG_DIR, fileName);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);

    if (!validateFrontmatter(data, fileName)) {
      continue;
    }

    // Skip drafts
    if (data.draft === true) {
      continue;
    }

    posts.push({
      slug: fileNameToSlug(fileName),
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      author: data.author as string,
      tags: (data.tags as string[]) ?? [],
      draft: false,
      heroImage: (data.heroImage as string) ?? undefined,
    });
  }

  // Sort by date descending (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/** Return a single post (with raw MDX content) by slug, or null if not found. */
export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) {
    return null;
  }

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"));

  for (const fileName of files) {
    if (fileNameToSlug(fileName) !== slug) {
      continue;
    }

    const filePath = path.join(BLOG_DIR, fileName);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    if (!validateFrontmatter(data, fileName)) {
      return null;
    }

    return {
      slug,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      author: data.author as string,
      tags: (data.tags as string[]) ?? [],
      draft: data.draft === true,
      heroImage: (data.heroImage as string) ?? undefined,
      content,
    };
  }

  return null;
}

/** Return a sorted array of unique tags across all published posts. */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();

  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }

  return Array.from(tagSet).sort();
}
