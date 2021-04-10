import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';

import auth from "@config/auth";

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/accounts/repositories/IUserTokensRepository';

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
    refreshToken: string;
}

@injectable()
class AuthUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
        @inject('DateProvider')
        private dateProvider: IDateProvider,
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

        const token = sign({}, auth.secretToken, {
            subject: user.id,
            expiresIn: auth.expiresInToken
        });

        const refreshToken = sign({ email }, auth.secretRefreshToken, {
            subject: user.id,
            expiresIn: auth.expiresInRefreshToken
        });

        const expiresDate = this.dateProvider.addDays(auth.expiresInRefreshTokenInDays);

        await this.userTokensRepository.create({
            refreshToken,
            userId: user.id,
            expiresDate,
        })

        return {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
            refreshToken,
        };
    }
}

export default AuthUserUseCase;
