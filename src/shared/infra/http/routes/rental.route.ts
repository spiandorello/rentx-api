import { Router } from 'express';

import CreateRentalController from '@modules/rentals/useCases/createRental/createRentalController';

import ensureAdmin from '@shared/infra/http/middlewares/ensureAdmin';
import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';

const rentalsRoute = Router();

const createRentalController = new CreateRentalController();

rentalsRoute.post('/',
    ensureAuthenticate,
    ensureAdmin,
    createRentalController.handle
);

export default rentalsRoute;
