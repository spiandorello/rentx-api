import express from 'express';

import categoriesRoute from './routes/categories.route';
import specificationsRoute from './routes/specifications.route';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRoute);
app.use('/specifications', specificationsRoute);

app.listen(3000);
