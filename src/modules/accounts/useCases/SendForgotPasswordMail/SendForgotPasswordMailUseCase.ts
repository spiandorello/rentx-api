import path from 'path';
import { v4 as uuidV4 } from 'uuid';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/accounts/repositories/IUserTokensRepository';
import IMailProvider from "@shared/container/providers/MailProvider/IEmailProvider";

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
        @inject('DateProvider')
        private dateProvider: IDateProvider,
        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('User not found');
        }

        const { refreshToken } = await this.userTokensRepository.create({
            userId: user.id,
            refreshToken: uuidV4(),
            expiresDate: this.dateProvider.addHours(3),
        });

        const templatePath = path.resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs');

        await this.mailProvider.sendMail(user.email, 'Recuperação de senha', templatePath, {
            name: user.name,
            link: `${process.env.BASE_URL}/password/reset/?token=${refreshToken}`,
        });
    }
}

export default SendForgotPasswordMailUseCase;
