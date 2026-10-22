/** @type {import('next').NextConfig} */
const nextConfig = {
    // Alleen bij `next build` statisch exporteren; in dev botst export met middleware
    output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
    trailingSlash: true,

    reactStrictMode: true,

    transpilePackages: ['d3-geo'],

    experimental: {
        esmExternals: false,
    },

    images: {
        unoptimized: true,
    },

    webpack: (config, { dev, isServer }) => {
        if (dev && !isServer) {
            config.cache = false;
        }

        return config;
    },
};

export default nextConfig;