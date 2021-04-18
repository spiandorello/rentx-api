import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarUseCase from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { filename } = request.file;

    const updateAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
    await updateAvatarUseCase.execute({
      userId: id,
      avatarFile: filename,
    });

    return response.status(204).send();
  }
}

export default UpdateUserAvatarController;
