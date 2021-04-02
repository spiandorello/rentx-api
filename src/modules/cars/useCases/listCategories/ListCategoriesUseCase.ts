import { injectable, inject } from 'tsyringe';

import Category from '@modules/cars/infra/typeorm/entities/Category';
import ICategoriesRepository from '@modules/cars/repositories/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute(): Promise<Category[]> {
        return this.categoriesRepository.findAll();
    }
}

export default ListCategoriesUseCase;
