// next.config.mjs

import pkg from "next-pwa";
const withPWA = pkg.default || pkg; // CommonJS compatibility

const nextConfig = {
  images: {
    domains: ["img.freepik.com"],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
};

export default withPWA(nextConfig);
