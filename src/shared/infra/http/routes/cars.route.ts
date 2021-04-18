import { Router } from 'express';

import CreateCarController from '@modules/cars/useCases/createCar/CreateCarController';

import ensureAdmin from '@shared/infra/http/middlewares/ensureAdmin';
import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import UploadCarImageController from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';
import ListAvailableCarsController from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import CreateCarSpecificationController from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const carsRoute = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarsImageController = new UploadCarImageController();

const uploadCarsImage = multer(uploadConfig);

carsRoute.post(
  '/',
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle,
);

carsRoute.post(
  '/:id/specifications',
  ensureAuthenticate,
  ensureAdmin,
  createCarSpecificationController.handle,
);

carsRoute.post(
  '/:id/images',
  ensureAuthenticate,
  ensureAdmin,
  uploadCarsImage.array('images'),
  uploadCarsImageController.handle,
);

carsRoute.get('/available', listAvailableCarsController.handle);

export default carsRoute;
