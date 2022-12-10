/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'b.scdn.gr'
      },
      {
        protocol: 'https',
        hostname: 'assets.houseofwine.gr'
      }
    ]
  }
}

module.exports = nextConfig
