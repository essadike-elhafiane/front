/**
 * @type {import('next').NextConfig}
 */


const nextConfig = {
    output: 'export',
    minify: true,
    experimental: {
      amp: true,
    },
    compress: true,
  }
 module.exports = nextConfig
