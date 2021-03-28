import { Router } from 'express';

import CreateSpecificationController from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoute = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoute.post('/', createSpecificationController.handle);

// specificationsRoute.get('/', (request: Request, response: Response) => {
//    return response.json(specificationRepository.findAll());
// });

export default specificationsRoute;
