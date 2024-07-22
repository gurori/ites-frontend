/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'localhost',
            port: '52905',
            pathname: '/api/**',
          },
        ],
      },
};

export default nextConfig;
