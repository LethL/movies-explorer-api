const { ERROR_CODE_DUPLICATE } = require('./errors');

class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_DUPLICATE;
  }
}

module.exports = DuplicateError;
