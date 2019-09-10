/**
 * 
 */

const publicRoutes = {
  'POST /match': 'EndPoints.postMatchHandler',
  'GET  /match': 'EndPoints.getMatchtHandler',
  'POST /content': 'EndPoints.postContentAdaptation'
};

module.exports = publicRoutes;
