/**
 * 
 */

const publicRoutes = require('./routes/PublicRoutes.js');

const config = {
  migrate: false,
  publicRoutes,
  port: process.env.PORT || '8081',
};

module.exports = config;