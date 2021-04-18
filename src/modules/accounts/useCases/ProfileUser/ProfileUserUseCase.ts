import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import UserMap from '@modules/accounts/mapper/UserMap';
import IUserResponseDTO from '@modules/accounts/dtos/IUserResponseDto';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';

interface IRequest {
  id: string;
}

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.find(id);
    if (!user) {
      throw new AppError('User not found');
    }
    return UserMap.toDTO(user);
  }
}

export default ProfileUserUseCase;
