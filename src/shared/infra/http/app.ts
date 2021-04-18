import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import upload from '@config/upload';
import AppError from '@shared/errors/AppError';
import swaggerDocument from '../../../../swagger.json';

import createConnection from '../typeorm';
import '@shared/container';

import router from './routes';

createConnection();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
app.use(
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (
    err: Error,
    request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ): Response => {
    if (err instanceof AppError) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return response.status(500).json({
      status: 'Error',
      message: `Internal server error: ${err.message}`,
    });
  },
);

export { app };
