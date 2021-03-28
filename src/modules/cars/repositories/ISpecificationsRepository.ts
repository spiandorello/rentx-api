import { Specification } from '../entities/Specification';

interface ISpecificationsRepository {
    findByName(name: string): Specification | undefined;

    findAll(): Specification[];

    save(data: Specification): void;
}

export default ISpecificationsRepository;
