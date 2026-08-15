/** @type {import('next').NextConfig} */

const backendProtocol = process.env.NEXT_PUBLIC_API_PROTOCOL || "https";
const backendHost = process.env.NEXT_PUBLIC_API_HOST || "gurori.ru";
const backendPort = process.env.NEXT_PUBLIC_API_PORT || "";

const backendUrl = `${backendProtocol}://${backendHost}${backendPort ? `:${backendPort}` : ""}`;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: backendProtocol === "https" ? "https" : "http",
        hostname: backendHost,
        ...(backendPort ? { port: backendPort } : {}),
        pathname: "/api/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
