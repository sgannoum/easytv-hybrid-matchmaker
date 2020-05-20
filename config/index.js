/**
 * 
 */

const publicRoutes = require('./routes/PublicRoutes.js');
const privateRoutes = require('./routes/PrivateRoutes.js');

const config = {
  migrate: false,
  publicRoutes,
  privateRoutes,
  port: process.env.PORT || '8087',
};

module.exports = config;