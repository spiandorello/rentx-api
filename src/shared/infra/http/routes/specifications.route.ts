import { Router } from 'express';

import CreateSpecificationController from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

import ensureAdmin from '@shared/infra/http/middlewares/ensureAdmin';
import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';

const specificationsRoute = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoute.post('/',
    ensureAuthenticate,
    ensureAdmin,
    createSpecificationController.handle
);

// specificationsRoute.get('/', (request: Request, response: Response) => {
//    return response.json(specificationRepository.findAll());
// });

export default specificationsRoute;
