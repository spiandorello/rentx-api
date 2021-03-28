import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserUseCase from './CreateUserUseCase';

class CreateUserController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, driver_license: driverLicense  } = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            name,
            email,
            password,
            driverLicense
        });

        return response.status(201).send();
    }
}

export default CreateUserController;
