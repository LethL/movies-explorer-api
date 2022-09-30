const { ERROR_CODE_SERVER } = require('../errors/errors');

const handlerErrors = (err, req, res, next) => {
  const { statusCode = ERROR_CODE_SERVER, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_CODE_SERVER
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

module.exports = handlerErrors;
