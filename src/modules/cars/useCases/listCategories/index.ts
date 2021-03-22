import ListCategoriesUseCase from './ListCategoriesUseCase';
import ListCategoriesController from './ListCategoriesController';
import CategoriesRepository from '../../repositories/implementations/CategoriesRepository';

const categoryRepository = CategoriesRepository.getInstance();

const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);

const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export { listCategoriesController };
