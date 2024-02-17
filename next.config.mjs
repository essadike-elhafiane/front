/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    images: {
        unoptimized: true,
      },
      env: {
        NEST_API: process.env.NEST_API,
      },
    // output: 'export',
    // images: { unoptimized: true } 
}

export default nextConfig
