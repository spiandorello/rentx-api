import ImportCategoryUseCase from './ImportCategoryUseCase';
import ImportCategoryController from './ImportCategoryController';
import CategoriesRepository from '../../repositories/implementations/CategoriesRepository';

const categoryRepository = null;

const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);

const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export { importCategoryController };
