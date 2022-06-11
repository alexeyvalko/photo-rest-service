export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 5500,
    host: process.env.HOST || 'localhost',
  },
});
