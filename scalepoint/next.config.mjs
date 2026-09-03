/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  async redirects() {
    // Old dedicated pages are consolidated into the toggle-driven home.
    return [
      { source: '/for-executives', destination: '/?mode=executive', permanent: true },
      { source: '/for-employers', destination: '/?mode=employer', permanent: true },
    ];
  },
};
export default nextConfig;
