/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'localhost',
            port: '64729',
            pathname: '/api/**',
          },
        ],
      },
};

export default nextConfig;
