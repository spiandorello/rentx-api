import Category from '../../entities/Category';
import ICategoriesRepository from "../../repositories/ICategoriesRepository";

class ListCategoriesUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute(): Promise<Category[]> {
        return this.categoriesRepository.findAll();
    }
}

export default ListCategoriesUseCase;
