import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import IUsersRepository from '../../repositories/IUsersRepository';
import CreateUserDto from "../../dtos/CreateUserDto";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({ name, email, password, driverLicense }: CreateUserDto): Promise<void> {
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
