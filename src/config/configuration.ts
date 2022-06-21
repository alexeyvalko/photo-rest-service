const isDev = process.env.NODE_ENV === 'development';
const host = isDev ? process.env.LOCAL_HOST : process.env.DEPLOY_HOST;
export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 5000,
    host: host || '0.0.0.0',
  },
  unsplash: {
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
    secretKey: process.env.UNSPLASH_SECRET_KEY,
  },
});
