import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Disable ESLint during build for production
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript checking during build for production
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure proper static generation for Netlify
  output: 'standalone',
  // Disable experimental features for production
  experimental: {},
};

export default nextConfig;
