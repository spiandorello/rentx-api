import User from '../entities/User';
import CreateUserDto from '../dtos/CreateUserDto';

interface IUsersRepository {
    findByEmail(email: string): Promise<User | undefined>
    create(data: CreateUserDto): Promise<void>;
}

export default IUsersRepository;
