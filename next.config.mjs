/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '89.111.173.200',
            port: '',
            pathname: '/api/**',
          },
        ],
      },
};

export default nextConfig;
