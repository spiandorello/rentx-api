import { Router } from 'express';

import AuthUserController from '@modules/accounts/useCases/AuthUser/AuthUserController';
import RefreshTokenController from "@modules/accounts/useCases/RefreshToken/RefreshTokenController";

const authenticationsRoute = Router();

const authUserController = new AuthUserController();
const refreshTokenController = new RefreshTokenController();

authenticationsRoute.post('/sessions', authUserController.handle);
authenticationsRoute.post('/refresh-token', refreshTokenController.handle);

export default authenticationsRoute;
