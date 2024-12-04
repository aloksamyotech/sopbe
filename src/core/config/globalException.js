
import logger from './logger.js';

const globalExceptionHandler = (err, req, res, next) => {
  const { method, originalUrl, body, params, headers } = req;
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let error = err.stack || 'No stack trace available';
  const isOperational = err.isOperational || false;
  const logMessage = `
    Method: ${method}
    URL: ${originalUrl}
    Params: ${JSON.stringify(params)}
    Body: ${JSON.stringify(body)}
    Headers: ${JSON.stringify(headers)}
    Error: ${message}
    Stack: ${error}
  `;
  
  if (statusCode === 500) {
    logger.error(logMessage); 
  } else {
    logger.warn(logMessage); 
  }

  res.status(statusCode).json({
    statusCode,
    message,
    error: isOperational ? message : 'Something went wrong on our end. Please try again later.',
    data: {},
  });
};

export default globalExceptionHandler;
