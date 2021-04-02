import { Router } from 'express';

import AuthUserController from '@modules/accounts/useCases/AuthUser/AuthUserController';

const sessionsRoute = Router();

const authUserController = new AuthUserController();

sessionsRoute.post('/', authUserController.handle);

export default sessionsRoute;
