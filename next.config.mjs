// next.config.mjs

/** @type {import('next').NextConfig} */
const securityHeaders = [
    // Zorgt dat browsers alleen via HTTPS praten (zet aan als je HTTPS live draait)
    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
    // Geen referrer-paths naar derden → betere privacy + minder ruis
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    // Kleine hardening
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    // Feature/permission beleid (pas aan als je features nodig hebt)
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig = {
    reactStrictMode: true,
    trailingSlash: false,
    transpilePackages: ['d3-geo'],
    poweredByHeader: false, // verberg X-Powered-By
    compress: true,         // gzip/brotli (Vercel: aan)
    experimental: {
        esmExternals: false,
    },
    images: {
        // Zet moderne formaten aan
        formats: ['image/avif', 'image/webp'],
        // domains: ['images.unsplash.com', 'your-cdn.com'],
    },

    // 301 redirects voor één canoniek domein + HTTPS
    async redirects() {
        return [
            // Force apex (zonder www)
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'www.sponsmedia.com' }],
                destination: 'https://sponsmedia.com/:path*',
                permanent: true,
            },
            // Force HTTPS (werkt achter proxy/CDN die x-forwarded-proto doorzet)
            {
                source: '/:path*',
                has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
                destination: 'https://sponsmedia.com/:path*',
                permanent: true,
            },
        ];
    },

    // Security headers op alle routes
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders,
            },
        ];
    },

    // Dev-optimalisatie (jouw bestaande)
    webpack: (config, { dev, isServer }) => {
        if (dev && !isServer) {
            config.cache = false;
        }
        return config;
    },
};

export default nextConfig;

//test