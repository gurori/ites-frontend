/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'localhost',
            port: '50686',
            pathname: '/api/**',
          },
        ],
      },
};

export default nextConfig;
