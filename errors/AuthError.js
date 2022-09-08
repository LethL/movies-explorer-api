const { ERROR_CODE_AUTH } = require('./errors');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_AUTH;
  }
}

module.exports = AuthError;
