import { getRepository, Repository } from 'typeorm';

import User from '../../entities/User';
import IUsersRepository from '../IUsersRepository';
import CreateUserDto from '../../dtos/CreateUserDto';

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async find(id: string): Promise<User | undefined> {
        return this.repository.findOne(id );
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.repository.findOne({ email });
    }

    async create({ name, email, password, driverLicense, avatar, id }: CreateUserDto): Promise<void> {
        const user = new User();

        Object.assign(user, {
            id,
            name,
            email,
            avatar,
            password,
            driverLicense
        });

        await this.repository.save(user);
    }
}

export default UsersRepository;
