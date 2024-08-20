/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
    swcMinify: false,
    transpilePackages: ['@plaiceholder/next'],
    images: {
        remotePatterns: [
            { hostname: 'res.cloudinary.com', protocol: 'https', port: '' }
        ]
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config;
    },
    typescript:{
        ignoreDuringBuilds:true
    },
    eslint:{
        ignoreDuringBuilds:true
    },
    reactStrictMode: true,
}

export default withPlaiceholder(nextConfig);
