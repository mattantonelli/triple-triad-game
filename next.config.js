/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "triad.raelys.com"
      }
    ]
  }
};

module.exports = nextConfig;
