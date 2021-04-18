import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUsersRentalUseCase from '@modules/rentals/useCases/listUsersRental/listUsersRentalUseCase';

class ListUsersRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const listUsersRentalUseCase = container.resolve(ListUsersRentalUseCase);

    const rental = await listUsersRentalUseCase.execute({
      userId,
    });

    return response.status(200).json(rental);
  }
}

export default ListUsersRentalController;
