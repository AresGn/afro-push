/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: {
        // Vos règles turbo ici
      },
    },
  },
  images: {
    domains: [
      // Vos domaines pour les images (si nécessaires)
    ],
  },
};

module.exports = nextConfig; 