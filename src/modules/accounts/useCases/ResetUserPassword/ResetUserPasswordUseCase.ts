import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/accounts/repositories/IUserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetUserPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);
    if (!userToken) {
      throw new AppError('Token not found!');
    }

    if (this.dateProvider.isBefore(userToken.expiresDate, new Date())) {
      throw new AppError('Token expired!');
    }

    const user = await this.usersRepository.find(userToken.userId);
    if (!user) {
      throw new AppError('User not found!');
    }

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.userTokensRepository.delete(userToken.id);
  }
}

export default ResetUserPasswordUseCase;
