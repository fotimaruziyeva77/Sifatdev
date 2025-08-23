import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dev.sifatdev.uz",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
