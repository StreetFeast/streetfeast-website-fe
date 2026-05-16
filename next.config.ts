import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'streetfeastdevelopment.blob.core.windows.net',
      },
      {
        protocol: 'https',
        hostname: 'streetfeastproduction.blob.core.windows.net',
      },
    ],
  },
};

export default nextConfig;
