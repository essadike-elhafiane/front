/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  env: {
    NEST_API: process.env.NEST_API,
  },
  images: {
    unoptimized: true,
  },
  };
  
  module.exports = nextConfig;