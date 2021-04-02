import Specification from '@modules/cars/infra/typeorm/entities/Specification';

interface ISpecificationsRepository {
    findByName(name: string): Promise<Specification | undefined>;

    findAll(): Promise<Specification[]>;

    save(data: Specification): Promise<void>;
}

export default ISpecificationsRepository;
