import Specification from '@modules/cars/infra/typeorm/entities/Specification';

interface ISpecificationsRepository {
    findByIds(ids: string[]): Promise<Specification[]>;

    findByName(name: string): Promise<Specification | undefined>;

    findAll(): Promise<Specification[]>;

    save(data: Specification): Promise<Specification>;
}

export default ISpecificationsRepository;
