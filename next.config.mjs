// next.config.mjs

import pkg from "next-pwa";
const withPWA = pkg.default || pkg; // CommonJS compatibility

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.freepik.com"], // ✅ Image domains config
  },
};

// ✅ Pass nextConfig & PWA config separately
export default withPWA({
  ...nextConfig,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development", // optional: disables PWA in dev mode
    // swSrc: "service-worker.js", // optional: if you want custom service worker
  },
});
