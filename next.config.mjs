/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,                 // prima om aan te hebben
    trailingSlash: false,                  // geen / achter elke URL (consistent met Vercel)
    transpilePackages: ['d3-geo'],
    experimental: {
        esmExternals: false,                 // houdt je huidige bundling stabiel
    },
    images: {
        // Laat optimalisatie aan.
        // Gebruik je externe images? Voeg dan je domeinen toe:
        // domains: ['images.unsplash.com', 'your-cdn.com'],
    },
    // Alleen een dev-optimalisatie; mag je ook weglaten.
    webpack: (config, { dev, isServer }) => {
        if (dev && !isServer) {
            config.cache = false;
        }
        return config;
    },
};

export default nextConfig;
