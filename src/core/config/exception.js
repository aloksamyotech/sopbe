class CustomError extends Error {
    constructor(statusCode, message, isOperational = true, stack = '') {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational; 
      this.stack = stack || new Error().stack; 
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default CustomError;
  