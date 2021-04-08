import { Router } from 'express';

import CreateRentalController from '@modules/rentals/useCases/createRental/createRentalController';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import DevolutionRentalController from "@modules/rentals/useCases/devolutionRental/devolutionRentalController";

const rentalsRoute = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoute.post('/',
    ensureAuthenticate,
    createRentalController.handle
);

rentalsRoute.post('/devolution/:id',
    ensureAuthenticate,
    devolutionRentalController.handle
);

export default rentalsRoute;
