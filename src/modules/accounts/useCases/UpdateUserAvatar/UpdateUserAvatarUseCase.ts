import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';

import { deleteFile } from '@utils/file';

interface IRequest {
    userId: string;
    avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({ userId, avatarFile }: IRequest): Promise<void> {
        const user = await this.usersRepository.find(userId);
        if (!user) {
            throw new AppError('User not found');
        }

        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }

        user.avatar = avatarFile;

        await this.usersRepository.create(user);
    }
}

export default UpdateUserAvatarUseCase;
