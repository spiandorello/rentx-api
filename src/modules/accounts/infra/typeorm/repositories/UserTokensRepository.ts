import { getRepository, Repository } from 'typeorm';

import UserToken from '@modules/accounts/infra/typeorm/entities/UserToken';
import ICreateUserTokenDto from '@modules/accounts/dtos/ICreateUserTokenDto';
import IUserTokensRepository from '@modules/accounts/repositories/IUserTokensRepository';

class UserTokensRepository implements IUserTokensRepository {
    private repository: Repository<UserToken>;

    constructor() {
        this.repository = getRepository(UserToken);
    }

    async create(data: ICreateUserTokenDto): Promise<UserToken> {
        const userToken = this.repository.create(data);

        await this.repository.save(userToken);

        return userToken;
    }
}

export default UserTokensRepository;
