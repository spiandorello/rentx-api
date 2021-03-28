import Category from '../entities/Category';

interface ICategoriesRepository {
    findByName(name: string): Promise<Category | undefined>;

    findAll(): Promise<Category[]>;

    save(data: Category): Promise<void>;
}

export default ICategoriesRepository;
