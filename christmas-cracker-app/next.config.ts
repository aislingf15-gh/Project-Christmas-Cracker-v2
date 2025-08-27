import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  // Optimize for serverless environments
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: process.env.MY_SECRET,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
  // Configure serverless functions
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ]
  },
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
  // Disable experimental features for production
  experimental: {},
};

export default nextConfig;
