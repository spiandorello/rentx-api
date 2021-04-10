import User from '../infra/typeorm/entities/User';
import ICreateUserDto from '../dtos/ICreateUserDto';

interface IUsersRepository {
    find(id: string): Promise<User | undefined>
    findByEmail(email: string): Promise<User | undefined>
    create(data: ICreateUserDto): Promise<void>;
}

export default IUsersRepository;
