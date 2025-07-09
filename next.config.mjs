// next.config.mjs

import pkg from "next-pwa";
const withPWA = pkg.default || pkg; // for CommonJS compatibility

// ✅ ONLY Next.js config here
const nextConfig = {
  images: {
    domains: ["img.freepik.com"],
  },
};

// ✅ Wrap the config and attach `pwa` inside the second-level object
export default withPWA({
  ...nextConfig, // this stays here
  // ⬇️ PWA config MUST go in `pwa` key – not flat
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    // swSrc: "service-worker.js", // if you have custom SW
  },
});
