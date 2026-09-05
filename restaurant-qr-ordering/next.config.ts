import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost:3002",
    "127.0.0.1:3002",
    "0.0.0.0:3002",
    "192.168.43.56:3002",
    "192.168.43.56",
    "localhost",
    "127.0.0.1"
  ],
};

export default nextConfig;
