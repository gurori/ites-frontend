/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'localhost',
            port: '59572',
            pathname: '/api/**',
          },
        ],
      },
};

export default nextConfig;
