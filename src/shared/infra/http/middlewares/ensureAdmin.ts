import { Response, Request, NextFunction } from 'express';

import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import AppError from '../../../errors/AppError';

async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;

  const userRepository = new UsersRepository();
  const user = await userRepository.find(id);

  // @ts-ignore
  if (!user.isAdmin) {
    throw new AppError('User must be an admin!');
  }

  return next();
}

export default ensureAdmin;
