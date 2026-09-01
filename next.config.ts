import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: '**.picsum.photos',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'gsap'],
  },
};

export default nextConfig;