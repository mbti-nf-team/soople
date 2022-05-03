/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  experimental: {
    emotion: true,
  },
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === 'production' && {
      properties: ['^data-test'],
    },
    removeConsole: {
      exclude: ['error'],
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
