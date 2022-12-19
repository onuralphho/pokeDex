/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: "@svgr/webpack",
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextjs-pokewiki-oui37fxpz-dejongyeong.vercel.app',
       
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
       
      },
    ],
  },
}

module.exports = nextConfig
