import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@fluentui/react-icons"],
  },
  serverExternalPackages: ["applicationinsights"],
};

export default nextConfig;
