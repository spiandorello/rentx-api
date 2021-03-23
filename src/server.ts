import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../swagger.json';

import router from './routes';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use(router);

app.listen(3000);
