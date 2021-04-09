import { Router } from 'express';

import CreateRentalController from '@modules/rentals/useCases/createRental/createRentalController';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import ListUsersRentalController from '@modules/rentals/useCases/listUsersRental/listUsersRentalController';
import DevolutionRentalController from '@modules/rentals/useCases/devolutionRental/devolutionRentalController';

const rentalsRoute = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listUsersRentalController = new ListUsersRentalController();

rentalsRoute.post('/',
    ensureAuthenticate,
    createRentalController.handle
);

rentalsRoute.post('/devolution/:id',
    ensureAuthenticate,
    devolutionRentalController.handle
);

rentalsRoute.get('/user',
    ensureAuthenticate,
    listUsersRentalController.handle
);

export default rentalsRoute;
