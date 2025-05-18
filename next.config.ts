import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "s3-alpha-sig.figma.com"],
  },
};

export default nextConfig;
