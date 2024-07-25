/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'localhost',
            port: '59086',
            pathname: '/api/**',
          },
        ],
      },
};

export default nextConfig;
