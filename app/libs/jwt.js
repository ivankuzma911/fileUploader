const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

module.exports = {
  sign: payload => jwt.sign({
    token: payload,
    exp: Math.floor(Date.now() / 1000) + Number(600000),
    iat: Math.floor(Date.now() / 1000) + Number(600000),
  }, jwtSecret),
  verify: payload => jwt.verify(payload, 'secret').token || false,
  decode: token => jwt.decode(token, { complete: true }),
};
