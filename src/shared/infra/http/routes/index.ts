import { Router } from 'express';

import carsRoute from '@shared/infra/http/routes/cars.route';
import usersRoute from '@shared/infra/http/routes/users.route';
import rentalsRoute from '@shared/infra/http/routes/rental.route';
import categoriesRoute from '@shared/infra/http/routes/categories.route';
import specificationsRoute from '@shared/infra/http/routes/specifications.route';
import authenticationsRoute from '@shared/infra/http/routes/authentications.route';
import passwordsRouteRoute from '@shared/infra/http/routes/passwords.route';

const router = Router();

router.use('/cars', carsRoute);
router.use('/users', usersRoute);
router.use('/rentals', rentalsRoute);
router.use('/auth', authenticationsRoute);
router.use('/categories', categoriesRoute);
router.use('/password', passwordsRouteRoute);
router.use('/specifications', specificationsRoute);

export default router;
