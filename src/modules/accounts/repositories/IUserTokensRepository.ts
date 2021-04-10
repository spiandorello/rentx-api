import ICreateUserTokenDto from '@modules/accounts/dtos/ICreateUserTokenDto';
import UserToken from '@modules/accounts/infra/typeorm/entities/UserToken';

interface IUserTokensRepository{
    create(data: ICreateUserTokenDto): Promise<UserToken>;
}

export default IUserTokensRepository;
