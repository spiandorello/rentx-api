import { injectable, inject } from 'tsyringe';

import Category from '../../entities/Category';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

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
