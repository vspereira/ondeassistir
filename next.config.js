/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@vercel/analytics"],
  },
};

module.exports = nextConfig;
