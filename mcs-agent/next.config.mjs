/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'pino-pretty': false
      };
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  // MCS Agent 관련 설정
  env: {
    NETWORK_RPC_URL: process.env.NETWORK_RPC_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    NFT_CONTRACT_ADDRESS: process.env.NFT_CONTRACT_ADDRESS,
    WALLET_ADDRESS: process.env.WALLET_ADDRESS,
    ZERO_G_STORAGE_API: process.env.ZERO_G_STORAGE_API,
    ZERO_G_STORAGE_KEY: process.env.ZERO_G_STORAGE_KEY
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