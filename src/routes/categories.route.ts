import { Router, Request, Response } from 'express';

import multer from 'multer';

import CreateCategoryController from '../modules/cars/useCases/createCategory/CreateCategoryController';
import listCategoriesController from '../modules/cars/useCases/listCategories';
import { importCategoryController } from '../modules/cars/useCases/importCategory';

const categoriesRoute = Router();

const createCategoryController = new CreateCategoryController();

const upload = multer({
   dest: './tmp/'
});

categoriesRoute.post('/', createCategoryController.handle);

categoriesRoute.get('/', (request: Request, response: Response) =>
   listCategoriesController().handle(request, response)
);

categoriesRoute.post('/import', upload.single('file'), (request: Request, response: Response) => {
   return importCategoryController.handle(request, response);
});

export default categoriesRoute;
