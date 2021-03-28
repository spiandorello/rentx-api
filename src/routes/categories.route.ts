import { Router, Request, Response } from 'express';

import multer from 'multer';

import createCategoryController from '../modules/cars/useCases/createCategory';
import listCategoriesController from '../modules/cars/useCases/listCategories';
import { importCategoryController } from '../modules/cars/useCases/importCategory';

const categoriesRoute = Router();

const upload = multer({
   dest: './tmp/'
});

categoriesRoute.post('/', (request: Request, response: Response) =>
    createCategoryController().handle(request, response)
);

categoriesRoute.get('/', (request: Request, response: Response) =>
   listCategoriesController().handle(request, response)
);

categoriesRoute.post('/import', upload.single('file'), (request: Request, response: Response) => {
   return importCategoryController.handle(request, response);
});

export default categoriesRoute;
