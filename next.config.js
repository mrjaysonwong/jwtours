/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'lh3.googleusercontent.com', 'flagcdn.com'],
  },
  env: {
    NINJA_KEY: process.env.NINJA_KEY,
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
  },
};

module.exports = nextConfig;
