class CustomError extends Error {
  constructor({ statusCode = 500, message = "An error occurred", errorCode = "UNKNOWN_ERROR", isOperational = true, stack = "" }) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.stack = stack || new Error().stack;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
