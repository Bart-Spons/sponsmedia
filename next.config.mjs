/** @type {import('next').NextConfig} */

// Statische export alleen bij `npm run build` (voor Hostinger).
// In `npm run dev` draait een gewone dev-server, zodat die zonder fouten werkt.
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    output: isProd ? "export" : undefined,
    trailingSlash: true,

    reactStrictMode: true,

    transpilePackages: ["d3-geo"],

    experimental: {
        esmExternals: false,
    },

    images: {
        // Nodig voor statische export: er is geen server die afbeeldingen optimaliseert
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
