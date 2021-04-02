import AuthUserUseCase from './AuthUserUseCase';
import AppError from '@shared/errors/AppError';
import UsersInMemoryRepository from '@modules/accounts/repositories/UsersInMemoryRepository';

let usersRepository: UsersInMemoryRepository;
let authUserUseCase: AuthUserUseCase;

describe('AuthUserUseCase', () => {
    beforeEach(() => {
        usersRepository = new UsersInMemoryRepository();
        authUserUseCase = new AuthUserUseCase(usersRepository);
    });

    it('should be able to authenticate user', async () => {
        const user = {
            name: 'Asterix',
            email: 'asterix@mailinator.com',
            password: '123123',
            driverLicense: '00000',
        };

        await usersRepository.create(user);

        const authUser = await authUserUseCase.execute({
            email: 'asterix@mailinator.com',
            password: '123123',
        });

        expect(authUser).toHaveProperty('user');
        expect(authUser).toHaveProperty('token');
    });

    it('should not be able to authenticate user with wrong email', async () => {
        await usersRepository.create({
            name: 'Asterix',
            email: 'asterix@mailinator.com',
            password: '123123',
            driverLicense: '00000',
        });

        await expect(authUserUseCase.execute({
            email: 'wrong@mailinator.com',
            password: '123123',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate user with wrong password', async () => {
        await usersRepository.create({
            name: 'Asterix',
            email: 'asterix@mailinator.com',
            password: '123123',
            driverLicense: '00000',
        });

        await expect(authUserUseCase.execute({
            email: 'asterix@mailinator.com',
            password: 'wrong',
        })).rejects.toBeInstanceOf(AppError);
    });
});
