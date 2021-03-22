import { Category } from '../../models/Category';
import ICategoriesRepository from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute({ name, description }: IRequest): void {
        const categoryAlreadyExists = this.categoriesRepository.findByName(name);
        if (categoryAlreadyExists) {
            throw new Error('This category already exists');
        }

        const category = new Category();

        Object.assign(category, {
            name,
            description,
            createdAt: new Date(),
        });

        this.categoriesRepository.save(category);
    }
}

export default CreateCategoryUseCase;
