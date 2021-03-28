import 'reflect-metadata';

import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../swagger.json';

import './database';
import './shared/container';

import router from './routes';

const DEFAULT_PORT = 3000;

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use(router);

app.listen(DEFAULT_PORT, () =>
    console.log(`Listen port ${DEFAULT_PORT}`)
);
