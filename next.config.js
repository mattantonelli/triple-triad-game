/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ffxivcollect.com"
      }
    ]
  }
};

module.exports = nextConfig;
