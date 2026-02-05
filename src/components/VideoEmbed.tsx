"use client";

import { useState } from "react";
import Image from "next/image";
import { Play24Filled } from "@fluentui/react-icons";

type VideoEmbedProps = {
  mode: "embed" | "mp4";
  embedUrl?: string;
  mp4Url?: string;
  posterUrl?: string;
  title: string;
};

export default function VideoEmbed({
  mode,
  embedUrl,
  mp4Url,
  posterUrl,
  title,
}: VideoEmbedProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  if (mode === "mp4") {
    return (
      <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
        <video
          className="h-full w-full"
          controls
          preload="none"
          poster={posterUrl}
          aria-label={title}
        >
          {mp4Url && <source src={mp4Url} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Embed mode: facade / lite-embed pattern
  return (
    <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
      {!iframeLoaded ? (
        <button
          type="button"
          className="relative flex h-full w-full items-center justify-center bg-black"
          onClick={() => setIframeLoaded(true)}
          aria-label={`Play ${title}`}
        >
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-muted" />
          )}
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 sm:h-20 sm:w-20">
            <Play24Filled className="h-8 w-8 sm:h-10 sm:w-10" />
          </span>
        </button>
      ) : (
        <iframe
          src={embedUrl}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  );
}
