/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'ik.imagekit.io'
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
  experimental: {
    // Enable strict mode for better development debugging
    strictMode: true,
  },
  // Add this to help prevent hydration issues
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
