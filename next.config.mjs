/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.(".svg")
        );

        // Modify rule for PNG, JPEG, and SVG handling
        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.(svg|png|jpe?g)$/i, // Handle SVG, PNG, JPEG files
                resourceQuery: /url/, // *.svg?url, *.png?url, *.jpg?url
            },
            // Convert SVG files to React components (if not using the ?url query)
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ["@svgr/webpack"],
            },
            // Ensure PNG and JPEG files are handled as URL imports (like the file loader does)
            {
                test: /\.(png|jpe?g)$/i,  // PNG and JPEG files
                type: "asset/resource",  // This tells Webpack to treat them as file imports
            }
        );

        // Modify the file loader rule to exclude *.svg, *.png, and *.jpeg files
        fileLoaderRule.exclude = /\.(svg|png|jpe?g)$/i;

        return config;
    },
};

export default nextConfig;
