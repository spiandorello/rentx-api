import { inject, injectable } from 'tsyringe';

import Category from '../../entities/Category';
import AppError from '../../../../errors/AppError';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
        if (categoryAlreadyExists) {
            throw new AppError('This category already exists');
        }

        const category = new Category();

        Object.assign(category, {
            name,
            description,
        });

        await this.categoriesRepository.save(category);
    }
}

export default CreateCategoryUseCase;
