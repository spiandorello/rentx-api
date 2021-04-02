import { v4 as uuidv4 } from 'uuid';

import Category from '@modules/cars/infra/typeorm/entities/Category';
import ICategoriesRepository from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[];

    constructor() {
        this.categories = [];
    }

    async findAll(): Promise<Category[]> {
        return this.categories;
    }

    async findByName(name: string): Promise<Category | undefined> {
        return this.categories.find(category => category.name === name);
    }

    async save({ name, description, createdAt }: Category): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            id: uuidv4(),
            name,
            description,
            createdAt: new Date(),
        });

        this.categories.push(category);
    }
}

export default CategoriesRepositoryInMemory;
