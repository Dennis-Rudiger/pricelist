import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js';

const isDev = process.env.NODE_ENV === 'development';

const withPWAConfigured = withPWA({
  dest: 'public',
  disable: isDev,
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

export default withPWAConfigured({
  reactStrictMode: true,
});
