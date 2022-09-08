const { ERROR_CODE_CAST } = require('./errors');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_CAST;
  }
}

module.exports = NotFoundError;
