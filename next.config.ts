import type { NextConfig } from "next";

async function headers() {
  return [
    {
      source: "/api/:path*",
      headers: [
        {
          key: "Access-Control-Allow-Origin",
          value: "*", // Set your origin
        },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET, POST, PUT, DELETE, OPTIONS, PATCH",
        },
        {
          key: "Access-Control-Allow-Headers",
          value: "Content-Type, Authorization",
        },
      ],
    },
  ];
}

const nextConfig: NextConfig = {
  /* config options here */
  headers,
};

export default nextConfig;
