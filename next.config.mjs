/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable standalone output for Render (detected via RENDER env var) or manual override
    output: (process.env.NEXT_STANDALONE === "true" || process.env.RENDER === "true") ? "standalone" : "export",

    images: {
        // Standalone builds on Render support optimized images; static exports require unoptimized
        unoptimized: !(process.env.NEXT_STANDALONE === "true" || process.env.RENDER === "true"),
    },

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

export default nextConfig;
