/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'localhost',
            port: '53127',
            pathname: '/api/**',
          },
        ],
      },
};

export default nextConfig;
