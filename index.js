import express from 'express';
import corsConfig from './src/core/config/cors.js';
import connectDB from './src/core/database/connection.js';
import globalExceptionHandler from './src/core/config/globalException.js';
import logger from './src/core/config/logger.js';
import "dotenv/config"

const app = express();
const PORT = (() => {
    const env = process.env.ENV;
    return env === 'development' ? 7200 : 4545;
})();

app.use(express.json());
app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
});
app.use(corsConfig);
connectDB()
    .then(() => {
        logger.info('Database connected successfully');
    })
    .catch((err) => {
        logger.error(`Database connection failed: ${err.message}`);
    });
app.use(globalExceptionHandler);

app.listen(PORT, () => {
    logger.info(`Server is running at port ${PORT}`);
});
