import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../../../errors/AppError';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";
import auth from "@config/auth";

interface IPayload {
    sub: string;
}

async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
        throw new AppError('JWT missing', 401);
    }

    const [, token] = authorization.split(' ');

    try {
        const usersTokenRepository = new UserTokensRepository();

        const { sub: userId } = verify(token, auth.secretRefreshToken) as IPayload;

        const user = usersTokenRepository.findByRefreshTokenAndUserId(token, userId);
        if (!user) {
            throw new AppError('User not found', 401);
        }

        request.user = { id: userId };

        return next();
    } catch (error) {
        throw new AppError('Invalid token', 401);
    }
}

export default ensureAuthenticate;
