/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['ik.imagekit.io'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/webp'],
    },
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config) => {
        config.optimization.splitChunks = {
            chunks: 'all',
            minSize: 20000,
            maxSize: 70000,
            cacheGroups: {
                default: false,
                vendors: false,
                framework: {
                    chunks: 'all',
                    name: 'framework',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 40,
                    enforce: true
                },
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2,
                    priority: 20
                }
            }
        };
        return config;
    }
};

module.exports = nextConfig;
