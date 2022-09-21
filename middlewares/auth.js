const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(req.cookies);
  console.log(token);
  console.log(req);
  if (!token) {
    throw new AuthError(('Токен не передан.'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new AuthError(('Некорректный токен.'));
  }

  req.user = payload;

  return next();
};
