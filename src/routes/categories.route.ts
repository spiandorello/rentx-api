import { Router, Request, Response } from 'express';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRoute = Router();

categoriesRoute.post('/', (request: Request, response: Response) =>
    createCategoryController.handle(request, response)
);

categoriesRoute.get('/', (request: Request, response: Response) => {
   return listCategoriesController.handle(request, response);
});

export default categoriesRoute;
