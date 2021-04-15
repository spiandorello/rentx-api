import 'reflect-metadata';
import 'dotenv/config'

import express, { NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../../../../swagger.json';

import createConnection from  '../typeorm';
import '@shared/container';

import router from './routes';
import AppError from '@shared/errors/AppError';
import upload from '@config/upload';

createConnection();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);

// @ts-ignore
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        // @ts-ignore
        return response.status(err.statusCode).json({
            message: err.message
        });
    }

    // @ts-ignore
    return response.status(500).json({
        status: 'Error',
        message: `Internal server error: ${err.message}`
    });
});

export { app };
