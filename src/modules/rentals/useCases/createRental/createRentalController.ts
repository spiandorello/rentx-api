import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRentalUseCase from '@modules/rentals/useCases/createRental/createRentalUseCase';

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const {
      start_at: startAt,
      expect_return_date: expectReturnDate,
      car_id: carId,
    } = request.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      userId,
      carId,
      startAt,
      expectReturnDate,
    });

    return response.status(201).json(rental);
  }
}

export default CreateRentalController;
