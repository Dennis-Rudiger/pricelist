import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js';

const isDev = process.env.NODE_ENV === 'development';

const withPWAConfigured = withPWA({
  dest: 'public',
  disable: isDev,
  register: true,
  skipWaiting: true,
  runtimeCaching,
  // Provide an offline fallback document when a page isn't cached and network fails
  fallbacks: {
    document: '/_offline',
  },
});

export default withPWAConfigured({
  reactStrictMode: true,
  // Workaround Windows file lock on .next/trace: use a custom distDir locally
  distDir: '.next-build',
});
