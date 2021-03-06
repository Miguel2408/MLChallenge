const privateRoutes = require('./routes/privateRoutes');
const publicRoutes = require('./routes/publicRoutes');
const swaggerOptions = require('./swagger');

const config = {
  migrate: false,
  privateRoutes,
  publicRoutes,
  port: process.env.PORT || '5000',
  swaggerOptions: swaggerOptions,
};

module.exports = config;
