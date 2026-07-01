/** @type {import('next').NextConfig} */

// Normalize FASTAPI_BASE_URL to ensure it doesn't have a trailing slash
let FASTAPI_BASE_URL = process.env.FASTAPI_BASE_URL ?? "http://localhost:8000";
if (FASTAPI_BASE_URL.endsWith('/')) {
    FASTAPI_BASE_URL = FASTAPI_BASE_URL.slice(0, -1);
}

if (!process.env.FASTAPI_BASE_URL && process.env.NODE_ENV === "production") {
    console.warn(
        "[next.config] WARNING: FASTAPI_BASE_URL is not set. " +
        "Falling back to http://localhost:8000 — this is likely wrong in production."
    );
}

const isStandalone = process.env.NEXT_STANDALONE === "true";

const nextConfig = {
    ...(isStandalone ? { output: "standalone" } : {}),

    images: {
        unoptimized: !isStandalone,
    },

    async rewrites() {
        return [
            {
                source: "/api/py/:path*",
                destination: `${FASTAPI_BASE_URL}/:path*`,
            },
        ];
    },

    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.(".svg")
        );

        if (fileLoaderRule) {
            config.module.rules.push(
                // Reapply the existing rule, but only for svg imports ending in ?url
                {
                    ...fileLoaderRule,
                    test: /\.svg$/i,
                    resourceQuery: /url/, // *.svg?url
                },
                // Convert all other *.svg imports to React components
                {
                    test: /\.svg$/i,
                    issuer: fileLoaderRule.issuer,
                    resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] }, // exclude if *.svg?url
                    use: ["@svgr/webpack"],
                }
            );

            // Modify the file loader rule to ignore *.svg, since we have it handled now.
            fileLoaderRule.exclude = /\.svg$/i;
        }

        return config;
    },
};

export default nextConfig;
