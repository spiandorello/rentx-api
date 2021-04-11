import { Router } from 'express';
import SendForgotPasswordMailController
    from '@modules/accounts/useCases/SendForgotPasswordMail/SendForgotPasswordMailController';

const passwordsRoute = Router();

const sendForgotPasswordController = new SendForgotPasswordMailController();

passwordsRoute.post('/forgot', sendForgotPasswordController.handle);

export default passwordsRoute;
