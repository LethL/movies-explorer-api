const jwt = require('jsonwebtoken');
// const AuthError = require('../errors/AuthError');

// const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new Error(('Неправильные почта или пароль.'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new Error(('Неправильные почта или пароль.'));
  }

  req.user = payload;

  return next();
};
