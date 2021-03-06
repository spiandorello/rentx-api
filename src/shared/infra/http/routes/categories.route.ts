import { Router } from 'express';

import multer from 'multer';

import CreateCategoryController from '@modules/cars/useCases/createCategory/CreateCategoryController';
import ListCategoriesController from '@modules/cars/useCases/listCategories/ListCategoriesController';
import ImportCategoryController from '@modules/cars/useCases/importCategory/ImportCategoryController';

import ensureAdmin from '@shared/infra/http/middlewares/ensureAdmin';
import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';

const categoriesRoute = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

const upload = multer({
  dest: './tmp/',
});

categoriesRoute.post(
  '/',
  ensureAuthenticate,
  ensureAdmin,
  createCategoryController.handle,
);

categoriesRoute.get('/', listCategoriesController.handle);

categoriesRoute.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export default categoriesRoute;
