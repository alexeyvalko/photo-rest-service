export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 5500,
    host: process.env.HOST || 'localhost',
  },
  unsplash: {
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
    secretKey: process.env.UNSPLASH_SECRET_KEY,
  },
});
