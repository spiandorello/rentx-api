import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import AppError from '@errors/AppError';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Invalid email or password data');
        }

        const passwordVerify = await compare(password, user.password);
        if (!passwordVerify) {
            throw new AppError('Invalid email or password data');
        }

        const token = sign({
            id: user.id,
            email: user.email
        }, '89805839-da4e-4b40-ac56-c71d19061f88');

        return {
            user: {
                name: user.name,
                email: user.email,
            },
            token
        };
    }
}

export default AuthUserUseCase;
