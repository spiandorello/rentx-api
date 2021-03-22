import { Category } from '../models/Category';

interface ICategoriesRepository {
    findByName(name: string): Category | undefined;

    findAll(): Category[];

    save(data: Category): void;
}

export default ICategoriesRepository;
