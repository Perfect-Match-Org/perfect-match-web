/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXTAUTH_URL,
  },
};

module.exports = nextConfig;
