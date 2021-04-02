import { Router } from 'express';

import usersRoute from './users.route';
import sessionsRoute from './sessions.route';
import categoriesRoute from './categories.route';
import specificationsRoute from './specifications.route';

const router = Router();

router.use('/users', usersRoute);
router.use('/sessions', sessionsRoute);
router.use('/categories', categoriesRoute);
router.use('/specifications', specificationsRoute);

export default router;
