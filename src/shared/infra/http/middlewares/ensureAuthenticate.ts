import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../../../errors/AppError';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

interface IPayload {
    id: string;
}

async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
        throw new AppError('JWT missing', 401);
    }

    const [, token] = authorization.split(' ');

    try {
        const { id } = verify(token, '89805839-da4e-4b40-ac56-c71d19061f88') as IPayload;

        const repository = new UsersRepository();
        const user = await repository.find(id);
        if (!user) {
            throw new AppError('User not found', 401);
        }

        request.user = { id };

        return next();
    } catch (error) {
        throw new AppError('Invalid token', 401);
    }
}

export default ensureAuthenticate;
