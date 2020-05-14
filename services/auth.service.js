const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = process.env.NODE_ENV === 'production' ? fs.readFileSync(process.env.JWT_SECRET, 'utf8').trim() : 'secret';

const authService = () => {
  const issue = (payload) => jwt.sign(payload, secret, { expiresIn: 15552000 });
  const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

  return {
    issue,
    verify,
  };
};

module.exports = authService;
