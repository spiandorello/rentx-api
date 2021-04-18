import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import AppError from '../../../errors/AppError';

interface IPayload {
  sub: string;
}

async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('JWT missing', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const usersRepository = new UsersRepository();

    const { sub: userId } = verify(token, auth.secretToken) as IPayload;

    const user = await usersRepository.find(userId);
    if (!user) {
      throw new AppError('User not found', 401);
    }

    request.user = { id: user.id };

    return next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}

export default ensureAuthenticate;
