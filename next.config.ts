import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co', // Allows images from your Supabase storage to display
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb', // Allows your high-res photos to upload (up to 10MB)
    },
  },
};

export default nextConfig;