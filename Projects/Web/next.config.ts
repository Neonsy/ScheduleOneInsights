import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        reactCompiler: true,
        viewTransition: true,
    },
    allowedDevOrigins: ['http://localhost:3000', 'next.neonsy.space'],
};

export default nextConfig;
