import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: "standalone",
    // Ensure node-pg-migrate + pg get traced into standalone
    outputFileTracingIncludes: {
        '/': ['./migrations/**/*'],
    },
};

export default nextConfig;
