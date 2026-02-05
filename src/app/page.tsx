import type { Metadata } from "next";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import VideoEmbed from "@/components/VideoEmbed";
import FeatureGrid from "@/components/FeatureGrid";
import CallToAction from "@/components/CallToAction";

export const metadata: Metadata = {
  title: "Spaarke | Igniting Innovation",
  description:
    "Spaarke helps businesses spark new ideas and turn them into reality.",
};

export default function Home() {
  const videoMode = (process.env.VIDEO_MODE ?? "mp4") as "embed" | "mp4";
  const embedUrl = process.env.VIDEO_EMBED_URL;
  const mp4Url = process.env.VIDEO_MP4_URL;
  const posterUrl = process.env.VIDEO_POSTER_URL;

  return (
    <>
      <Hero />

      {/* Video section */}
      <section className="border-t border-border bg-muted py-16 sm:py-20">
        <Container>
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            See Spaarke in Action
          </h2>
          <div className="mx-auto max-w-4xl">
            <VideoEmbed
              mode={videoMode}
              embedUrl={embedUrl}
              mp4Url={mp4Url}
              posterUrl={posterUrl}
              title="Spaarke overview video"
            />
          </div>
        </Container>
      </section>

      <FeatureGrid />

      <CallToAction />
    </>
  );
}
