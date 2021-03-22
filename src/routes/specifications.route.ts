import { Router, Request, Response } from 'express';

import CreateCategoryUseCase from '../modules/cars/useCases/createCategory/CreateCategoryUseCase';
import CategoriesRepository from '../modules/cars/repositories/implementations/CategoriesRepository';
import CreateSpecificationService from "../modules/cars/services/CreateSpecificationService";
import SpecificationsRepository from "../modules/cars/repositories/implementations/SpecificationsRepository";

const specificationsRoute = Router();

const specificationRepository = new SpecificationsRepository();

specificationsRoute.post('/', (request: Request, response: Response) => {
    const { name, description } = request.body;

    const createSpecification = new CreateSpecificationService(specificationRepository);

    createSpecification.execute({
        name,
        description,
    });

    return response.status(201).send();
});

specificationsRoute.get('/', (request: Request, response: Response) => {
   return response.json(specificationRepository.findAll());
});

export default specificationsRoute;
