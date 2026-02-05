"use client";

import {
  Lightbulb24Regular,
  Code24Regular,
  Rocket24Regular,
} from "@fluentui/react-icons";
import Container from "@/components/Container";

const features = [
  {
    icon: Lightbulb24Regular,
    heading: "Innovation & Strategy",
    description:
      "We partner with you to identify opportunities, define a clear roadmap, and craft strategies that drive meaningful business outcomes.",
  },
  {
    icon: Code24Regular,
    heading: "Technical Excellence",
    description:
      "Our engineers deliver high-quality, maintainable solutions using modern frameworks and best practices, ensuring your product is built to last.",
  },
  {
    icon: Rocket24Regular,
    heading: "Scalable Solutions",
    description:
      "From proof of concept to production at scale, we design architectures that grow with your business and adapt to changing demands.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.heading}
              className="rounded-xl border border-border bg-background p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {feature.heading}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
