/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "www.kiaancloud.store",
      },
      {
        protocol: "https",
        hostname: "https://www.kiaancloud.store/ff/", 
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      
     
    ],
  },
  
};

module.exports = nextConfig;
