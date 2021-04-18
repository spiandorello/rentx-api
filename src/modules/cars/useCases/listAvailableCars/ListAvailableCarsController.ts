import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAvailableCarsUseCase from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase';

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase,
    );

    const carsAvailable = await listAvailableCarsUseCase.execute({
      name: name as string,
      brand: brand as string,
      categoryId: category_id as string,
    });

    return response.json(carsAvailable);
  }
}

export default ListAvailableCarsController;
