import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import IUsersRepository from '../../repositories/IUsersRepository';

interface IRequest {
    name: string,
    email: string,
    password: string,
    driverLicense: string
}

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({ name, email, password, driverLicense }: IRequest): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new Error('User already used');
        }

        const passwordHashed = await hash(password, 8);

        await this.usersRepository.create({
            name,
            email,
            password: passwordHashed,
            driverLicense
        });
    }
}

export default CreateUserUseCase;
