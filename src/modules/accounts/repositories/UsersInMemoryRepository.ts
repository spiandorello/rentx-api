import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import User from '../infra/typeorm/entities/User';
import ICreateUserDto from '../dtos/ICreateUserDto';
import IUsersRepository from './IUsersRepository';

class UsersInMemoryRepository implements IUsersRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    async create({ id, name, avatar, password, email, driverLicense }: ICreateUserDto): Promise<void> {
        const passwordHashed = await hash(password, 8);

        const user = Object.assign(new User(), {
            id: uuidv4(),
            name,
            email,
            password: passwordHashed,
            driverLicense,
            avatar,
            createdAt: new Date()
        });

        this.users.push(user);
    }

    async find(id: string): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email)
    }

}

export default UsersInMemoryRepository;
