import { Router } from 'express';
import multer from 'multer';

import CreateUserController from '@modules/accounts/useCases/CreateUser/CreateUserController';
import UpdateUserAvatarController from '@modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController';
import ProfileUserController from '@modules/accounts/useCases/ProfileUser/ProfileUserController';

import uploadConfig from '@config/upload';
import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';

const usersRoute = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig);

usersRoute.post('/', createUserController.handle);

usersRoute.get('/profile', ensureAuthenticate, profileUserController.handle);
usersRoute.patch(
  '/avatar',
  ensureAuthenticate,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

export default usersRoute;
