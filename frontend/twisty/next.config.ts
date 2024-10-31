import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  server:{
    proxy:{
      "./api":"http://localhost:5000"
    }
  }
};

export default nextConfig;
