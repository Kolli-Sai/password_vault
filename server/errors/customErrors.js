const { StatusCodes } = require("http-status-codes");

class CustomError extends Error {
  constructor(message) {
    super(message);
    // this.statusCode = statusCode;
    // this.statusMessage = statusMessage;
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.statusMessage = "NOT_FOUND";
  }
}
class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.statusMessage = "BAD_REQUEST";
  }
}
class ConflictError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
    this.statusMessage = "CONFLICT";
  }
}
class UnprocessableEntityError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    this.statusMessage = "UNPROCESSABLE_ENTITY";
  }
}
class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.statusMessage = "UNAUTHORIZED";
  }
}

module.exports = {
  NotFoundError,
  CustomError,
  BadRequestError,
  ConflictError,
  UnprocessableEntityError,
  UnauthorizedError,
};
