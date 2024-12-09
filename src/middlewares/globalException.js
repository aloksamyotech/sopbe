import logger from '../core/utils/logger.js';

const globalExceptionHandler = (err, req, res, next) => {
  const {
    method,
    originalUrl: url,
    body,
    params,
    headers,
  } = req;

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const isOperational = err.isOperational || false;
  const errorCode = err.errorCode || "UNKNOWN_ERROR"; // Default error code
  const stack = process.env.NODE_ENV === "development" ? err.stack : undefined;

  const logDetails = {
    method,
    url,
    params,
    body,
    headers,
    message,
    stack,
  };

  if (statusCode >= 500) {
    logger.error(logDetails);
  } else {
    logger.warn(logDetails);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: isOperational ? message : "An unexpected error occurred.",
    error: isOperational ? null : "Contact support or try again later.",
    errorCode, // Include the error code in the response
    data: {},
    timestamp: new Date().toISOString(),
  });
};

export default globalExceptionHandler;
