const nextConfig = {
    webpack(config) {
        // Add a rule for handling image files (png, jpg, etc.)
        config.module.rules.push({
            test: /\.(PNG|png|jpe?g|gif|webp|avif|ico)$/i,
            type: "asset/resource",
            generator: {
                filename: "static/media/[name].[hash][ext]",
            },
        });

        // Modify SVG handling as per your existing configuration
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.(".svg")
        );

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
                use: ["@svgr/webpack"],
            }
        );

        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
};

export default nextConfig;
