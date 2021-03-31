import { Router } from 'express';
import multer from 'multer';

import CreateUserController from '../modules/accounts/useCases/CreateUser/CreateUserController';
import UpdateUserAvatarController from '../modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController';

import uploadConfig from '../config/upload';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';

const usersRoute = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

usersRoute.post('/', createUserController.handle);

usersRoute.patch('/avatar', ensureAuthenticate, uploadAvatar.single('avatar'), updateUserAvatarController.handle);

export default usersRoute;
