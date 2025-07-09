import withPWA from "next-pwa";

// Next.js configuration
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["img.freepik.com"],
    unoptimized: true,
  },
};

// PWA configuration
const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
};

// Export the combined configuration
export default withPWA({
  ...nextConfig,
  pwa: pwaConfig,
});
