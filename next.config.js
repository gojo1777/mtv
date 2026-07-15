/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization සඳහා
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'i.imgur.com',
      'image.tmdb.org',
      'cdn.discordapp.com',
      'drive.google.com',
      'res.cloudinary.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false,
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://movie-web-rust-eight.vercel.app',
  },

  // Build optimization (swcMinify removed - default in Next.js 15)
  compress: true,

  // Production වලදී source maps disable කරන්න
  productionBrowserSourceMaps: false,

  // Strict mode
  reactStrictMode: true,

  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
}

// ES Module export
export default nextConfig
