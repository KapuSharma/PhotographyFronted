import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Whitelisted hosts for the Next.js <Image /> optimizer. Unsplash is used
    // for the frontend placeholder imagery (e.g. the blog hero banner).
    // NOTE: tenant/CMS imagery from arbitrary hosts should keep using plain
    // <img> since those hosts can't all be whitelisted here.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
