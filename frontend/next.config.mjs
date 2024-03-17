/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    THIRD_WEB_CLIENT_ID: process.env.THIRD_WEB_CLIENT_ID,
    THIRD_WEB_SECRET_KEY: process.env.THIRD_WEB_SECRET_KEY,
    ARBISCAN_API_KEY: process.env.ARBISCAN_API_KEY,
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
