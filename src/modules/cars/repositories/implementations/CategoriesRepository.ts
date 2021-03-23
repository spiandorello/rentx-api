import { Category } from '../../models/Category';
import ICategoriesRepository from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private readonly repository: Category[]

    private static INSTANCE: CategoriesRepository;

    private constructor() {
        this.repository = [];
    }

    public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }

        return CategoriesRepository.INSTANCE;
    }

    findAll(): Category[] {
        return this.repository;
    }

    public findByName(name: string): Category | undefined {
        return this.repository.find(category => category.name === name);
    }

    public save(data: Category): void {
        this.repository.push(data);
    }
}

export default CategoriesRepository;
