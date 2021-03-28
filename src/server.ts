import 'reflect-metadata';

import express, { NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../swagger.json';

import './database';
import './shared/container';

import router from './routes';
import AppError from './errors/AppError';

const DEFAULT_PORT = 3000;

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }

    return response.status(500).json({
        status: 'Error',
        message: `Internal server error: ${err.message}`
    });
});

app.listen(DEFAULT_PORT, () =>
    console.log(`Listen port ${DEFAULT_PORT}`)
);
