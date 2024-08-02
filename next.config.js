/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ddavid-recipes-bucket.s3.eu-central-1.amazonaws.com',
                port: '', // usually empty for default ports
                pathname: '/**', // allows all paths
            },
        ],
    },
}

module.exports = nextConfig


