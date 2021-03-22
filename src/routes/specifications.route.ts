import { Router, Request, Response } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/createSpecification';

const specificationsRoute = Router();

specificationsRoute.post('/', (request: Request, response: Response) => {
    return createSpecificationController.handle(request, response);
});

// specificationsRoute.get('/', (request: Request, response: Response) => {
//    return response.json(specificationRepository.findAll());
// });

export default specificationsRoute;
