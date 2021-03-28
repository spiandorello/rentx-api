import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthUserUseCase from './AuthUserUseCase';

class AuthUserController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authUserUseCase = container.resolve(AuthUserUseCase);

        const authUser = await authUserUseCase.execute({
            email,
            password,
        });

        return response.json(authUser);
    }
}

export default AuthUserController;
