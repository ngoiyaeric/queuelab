/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.(".svg")
        );

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
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ["@svgr/webpack"],
            }
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
};

// Configuration for static export
const config = {
    ...nextConfig,
    images: {
        unoptimized: true,
        formats: ['image/avif', 'image/webp'],
    },
    // Since this is a static export, headers are usually handled by the hosting provider (Firebase/Vercel)
    // But we can still provide hints or use a custom server if needed.
    // For Firebase, we should update firebase.json for CDN caching.
};

export default config;
