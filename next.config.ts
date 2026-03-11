import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",//!here Setting Limit That The File Upload Size  Should be this
    },
  },
}

export default nextConfig