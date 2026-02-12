/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.externals.push('canvas', 'jsdom');
    return config;
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['three', '@react-three/fiber'],
  },
};

export default nextConfig;
