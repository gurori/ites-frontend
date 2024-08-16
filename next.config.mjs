/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '89.111.173.200',
            port: '',
            pathname: '/api/**',
          },
        ],
      },
};

export default nextConfig;
