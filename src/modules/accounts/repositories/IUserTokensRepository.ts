import ICreateUserTokenDto from '@modules/accounts/dtos/ICreateUserTokenDto';
import UserToken from '@modules/accounts/infra/typeorm/entities/UserToken';

interface IUserTokensRepository {
    findByRefreshTokenAndUserId(token: string, userId: string): Promise<UserToken | undefined>;
    findByRefreshToken(token: string): Promise<UserToken | undefined>;
    create(data: ICreateUserTokenDto): Promise<UserToken>;
    delete(id: string): Promise<void>;
}

export default IUserTokensRepository;
