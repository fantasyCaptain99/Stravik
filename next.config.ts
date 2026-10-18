import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    /* Next.js 16 only serves qualities listed here; anything else returns
       400 from the optimizer. 75 is the default used across the site; 86 is
       for the full-viewport hero photography, whose 1672px sources are
       upscaled on wide displays and soften at the lower setting. */
    qualities: [75, 86],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [{ source: "/services", destination: "/solutions", permanent: false }];
  },
};

export default nextConfig;
