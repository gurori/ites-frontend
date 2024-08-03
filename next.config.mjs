/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'localhost',
            port: '52171',
            pathname: '/api/**',
          },
        ],
      },
};

export default nextConfig;
