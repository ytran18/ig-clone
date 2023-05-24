/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com'],
  }
}

module.exports = nextConfig
