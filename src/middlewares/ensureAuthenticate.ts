import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import UsersRepository from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    id: string;
}

async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
        throw new Error('JWT missing');
    }

    const [, token] = authorization.split(' ');

    try {
        const { id } = verify(token, '89805839-da4e-4b40-ac56-c71d19061f88') as IPayload;

        const repository = new UsersRepository();
        const user = await repository.find(id);
        if (!user) {
            throw new Error('User not found');
        }

        // request.user = user;

        return next();
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export default ensureAuthenticate;
