import { Router } from 'express';

import CreateCarController from '@modules/cars/useCases/createCar/CreateCarController';

import ensureAdmin from '@shared/infra/http/middlewares/ensureAdmin';
import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import ListAvailableCarsController from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

const carsRoute = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoute.post('/',
    ensureAuthenticate,
    ensureAdmin,
    createCarController.handle
);

carsRoute.get('/available', listAvailableCarsController.handle);

export default carsRoute;
