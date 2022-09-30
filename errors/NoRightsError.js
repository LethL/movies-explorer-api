const { ERROR_CODE_RIGHTS } = require('./errors');

class NoRightsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_RIGHTS;
  }
}

module.exports = NoRightsError;
