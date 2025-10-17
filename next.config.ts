import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "wbzqtgiqyal97kli.public.blob.vercel-storage.com",
            },
        ],
    },
};

export default nextConfig;
