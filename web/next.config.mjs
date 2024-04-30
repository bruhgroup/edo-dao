/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: config => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        config.module.exprContextCritical = false;
        return config;
    }
}
export default nextConfig;
