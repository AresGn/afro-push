/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    turbo: {
      resolveAlias: {
        // Fixes Tailwind CSS v4 compatibility issues
        tailwindcss: 'tailwindcss/lib/tailwindcss.js',
      },
    },
  },
};

module.exports = nextConfig; 