class ExpressError extends Error {
  constructor(message, statusCode) {
    super();          // call parent Error constructor
    this.statusCode = statusCode; // store custom status code
    this.message = message;
  }
}

module.exports = ExpressError;