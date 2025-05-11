import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        reactCompiler: true,
        viewTransition: true,
    },
    allowedDevOrigins: ['http://localhost:3000', 'next.scheduleoneinsights.space'],
};

export default nextConfig;
