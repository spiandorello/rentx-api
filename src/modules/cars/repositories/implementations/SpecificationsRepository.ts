import { getRepository, Repository } from 'typeorm';

import Specification from '../../entities/Specification';
import ISpecificationsRepository from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async findAll(): Promise<Specification[]> {
        return this.repository.find();
    }

    async findByName(name: string): Promise<Specification | undefined> {
        return this.repository.findOne({ name });
    }

    async save({ name, description }: Specification): Promise<void> {
        const specification = this.repository.create({
            name,
            description
        });

        await this.repository.save(specification);
    }
}

export default SpecificationsRepository;
