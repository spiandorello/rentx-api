import { Router } from 'express';
import SendForgotPasswordMailController from '@modules/accounts/useCases/SendForgotPasswordMail/SendForgotPasswordMailController';

import ResetUserPasswordController from '@modules/accounts/useCases/ResetUserPassword/ResetUserPasswordController';

const passwordsRoute = Router();

const resetUserPasswordController = new ResetUserPasswordController();
const sendForgotPasswordController = new SendForgotPasswordMailController();

passwordsRoute.post('/reset', resetUserPasswordController.handle);
passwordsRoute.post('/forgot', sendForgotPasswordController.handle);

export default passwordsRoute;
