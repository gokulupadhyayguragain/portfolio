/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'brm-workforce.oracle.com',
        port: '',
        pathname: '/pdf/certview/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.credly.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.githubassets.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.linuxfoundation.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nodejs.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kubernetes.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
