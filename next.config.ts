import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    // 静的エクスポート時は画像最適化APIが使用できないため、unoptimizedを有効化
    // next/imageコンポーネント自体は使用可能（lazy loading、sizes属性などの機能は有効）
    unoptimized: true,
    // 使用しているquality値（75, 80, 85, 90）を設定
    qualities: [75, 80, 85, 90],
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
