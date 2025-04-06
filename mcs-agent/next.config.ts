import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // MCS Agent 관련 설정
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    ANALYZER_API_URL: process.env.ANALYZER_API_URL,
    TEE_SERVICE_URL: process.env.TEE_SERVICE_URL,
    TEE_API_KEY: process.env.TEE_API_KEY,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_SECRET_KEY: process.env.PINATA_SECRET_KEY,
    ZEROG_CHAIN_RPC_URL: process.env.ZEROG_CHAIN_RPC_URL,
    ZEROG_CHAIN_PRIVATE_KEY: process.env.ZEROG_CHAIN_PRIVATE_KEY,
  },
  // API 라우트 설정
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*', // Python 분석 서버
      },
    ];
  },
};

export default nextConfig;
