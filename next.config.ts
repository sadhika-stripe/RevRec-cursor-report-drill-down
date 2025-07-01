import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/RevRec-cursor-report-drill-down",
  assetPrefix: "/RevRec-cursor-report-drill-down",
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
