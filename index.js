import express from 'express';
import corsConfig from './src/core/config/cors.js';
import connectDB from './src/core/database/connection.js';
import globalExceptionHandler from './src/middlewares/globalException.js';
import logger from './src/core/utils/logger.js';
import "dotenv/config";
import CustomError from './src/middlewares/exception.js';
import responseInterceptor from './src/middlewares/responseInterceptor.js';

const app = express();

const PORT = process.env.PORT || (() => {
    const env = process.env.ENV || 'development';
    return env === 'development' ? 7200 : 4545;
})();

app.use(express.json());
app.use(corsConfig);
app.use(responseInterceptor);

app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
});

connectDB()
    .then(() => logger.info('Database connected successfully'))
    .catch((err) => {
        logger.error(`Database connection failed: ${err.message}`);
        process.exit(1);
    });


app.use((req, res, next) => {
    next(new CustomError({
        statusCode: 404,
        message: 'Resource not found',
        errorCode: 'RESOURCE_NOT_FOUND',
    }));
});

app.use(globalExceptionHandler);

app.listen(PORT, () => {
    logger.info(`Server is running at port ${PORT}`);
});
