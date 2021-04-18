import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ProfileUserUseCase from '@modules/accounts/useCases/ProfileUser/ProfileUserUseCase';

class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const profileUserUseCase = container.resolve(ProfileUserUseCase);
    const profileUser = await profileUserUseCase.execute({ id });

    return response.json(profileUser);
  }
}

export default ProfileUserController;
