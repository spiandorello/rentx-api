import CreateCategoryUseCase from './CreateCategoryUseCase';
import CreateCategoryController from './CreateCategoryController';
import CategoriesRepository from '../../repositories/implementations/CategoriesRepository';

const categoryRepository = CategoriesRepository.getInstance();

const categoryUseCase = new CreateCategoryUseCase(categoryRepository);

const createCategoryController = new CreateCategoryController(categoryUseCase);

export { createCategoryController };
