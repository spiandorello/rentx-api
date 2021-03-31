import { Router } from 'express';

import ensureAuthenticate from '@middlewares/ensureAuthenticate';
import CreateSpecificationController from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoute = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoute.post('/', ensureAuthenticate, createSpecificationController.handle);

// specificationsRoute.get('/', (request: Request, response: Response) => {
//    return response.json(specificationRepository.findAll());
// });

export default specificationsRoute;
