import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wprs.my-hobby.space',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'nssu-ekiden.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
