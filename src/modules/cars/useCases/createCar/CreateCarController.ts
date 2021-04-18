import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCarUseCase from '@modules/cars/useCases/createCar/CreateCarUseCase';

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      daily_rate: dailyRate,
      license_plate: licensePlate,
      fine_amount: fineAmount,
      brand,
      category_id: categoryId,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });

    return response.status(201).send(car);
  }
}

export default CreateCarController;
