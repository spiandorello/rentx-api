import CreateCategoryUseCase from './CreateCategoryUseCase';
import CreateCategoryController from './CreateCategoryController';
import CategoriesRepository from '../../repositories/implementations/CategoriesRepository';


export default(): CreateCategoryController => {
    const categoryRepository = new CategoriesRepository();

    const categoryUseCase = new CreateCategoryUseCase(categoryRepository);

    return new CreateCategoryController(categoryUseCase);
};
