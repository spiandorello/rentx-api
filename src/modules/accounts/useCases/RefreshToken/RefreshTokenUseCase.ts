import { inject, injectable } from 'tsyringe';
import {sign, verify} from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';

import auth from "@config/auth";

import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '@modules/accounts/repositories/IUserTokensRepository';

interface IRequest {
    token: string;
}

interface IPayload {
    sub: string;
    email: string;
}

interface IResponse {
    token: string,
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
        @inject('DateProvider')
        private dateProvider: IDateProvider,
    ) {}

    async execute({ token }: IRequest): Promise<IResponse> {
        const { sub: userId, email } = await verify(token, auth.secretRefreshToken) as IPayload;

        const userToken = await this.userTokensRepository.findByRefreshTokenAndUserId(token, userId);
        if (!userToken) {
            throw new AppError('User token not exists');
        }

        await this.userTokensRepository.delete(userToken.id);

        const refreshToken = sign({ email },auth.secretRefreshToken, {
            subject: userId,
            expiresIn: auth.expiresInRefreshToken
        });

        const expiresDate = this.dateProvider.addDays(auth.expiresInRefreshTokenInDays);

        await this.userTokensRepository.create({
            userId,
            refreshToken,
            expiresDate,
        });

        const newToken = sign({ email }, auth.secretToken, {
            subject: userId,
            expiresIn: auth.expiresInToken
        });

        return {
            refresh_token: refreshToken,
            token: newToken,
        };
    }
}

export default RefreshTokenUseCase;
