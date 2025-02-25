/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/',
            destination: '/advocates',
          },
        ];
      },
};

export default nextConfig;
