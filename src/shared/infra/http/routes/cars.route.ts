import { Router } from 'express';

import CreateCarController from '@modules/cars/useCases/createCar/CreateCarController';

import ensureAdmin from '@shared/infra/http/middlewares/ensureAdmin';
import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import ListAvailableCarsController from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import CreateCarSpecificationController from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';

const carsRoute = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoute.post('/',
    ensureAuthenticate,
    ensureAdmin,
    createCarController.handle
);

carsRoute.post('/:id/specifications',
    ensureAuthenticate,
    ensureAdmin,
    createCarSpecificationController.handle
);

carsRoute.get('/available', listAvailableCarsController.handle);

export default carsRoute;
