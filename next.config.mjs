// next.config.js

import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.freepik.com"],
  },
};

export default withPWA({
  ...nextConfig,
  // PWA settings
  dest: "public",
  register: true,
  skipWaiting: true,
});
