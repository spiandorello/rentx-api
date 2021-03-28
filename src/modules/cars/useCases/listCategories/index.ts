import ListCategoriesUseCase from './ListCategoriesUseCase';
import ListCategoriesController from './ListCategoriesController';
import CategoriesRepository from '../../repositories/implementations/CategoriesRepository';

export default(): ListCategoriesController => {
    const categoryRepository = new CategoriesRepository();

    const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);

    return new ListCategoriesController(listCategoriesUseCase);
};
