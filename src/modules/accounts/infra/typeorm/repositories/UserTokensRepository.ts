import { getRepository, Repository } from 'typeorm';

import UserToken from '@modules/accounts/infra/typeorm/entities/UserToken';
import ICreateUserTokenDto from '@modules/accounts/dtos/ICreateUserTokenDto';
import IUserTokensRepository from '@modules/accounts/repositories/IUserTokensRepository';

class UserTokensRepository implements IUserTokensRepository {
    private repository: Repository<UserToken>;

    constructor() {
        this.repository = getRepository(UserToken);
    }

    async findByRefreshTokenAndUserId(token: string, userId: string): Promise<UserToken | undefined> {
        return this.repository.findOne({
            where: {
                refreshToken: token,
                userId
            }
        });
    }

    async findByRefreshToken(token: string ): Promise<UserToken | undefined> {
        return this.repository.findOne({
            where: { refreshToken: token }
        });
    }

    async create(data: ICreateUserTokenDto): Promise<UserToken> {
        const userToken = this.repository.create(data);

        await this.repository.save(userToken);

        return userToken;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export default UserTokensRepository;
