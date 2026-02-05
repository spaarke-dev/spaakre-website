"use client";

import { Tag20Regular } from "@fluentui/react-icons";

type TagPillsProps = {
  tags: string[];
};

export default function TagPills({ tags }: TagPillsProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag20Regular className="h-4 w-4 text-muted-foreground" />
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
