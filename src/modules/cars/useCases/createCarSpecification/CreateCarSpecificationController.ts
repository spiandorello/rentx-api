import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCarSpecificationUseCase from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: carId } = request.params;
    const { specifications_id: specificationsId } = request.body;

    const createCarSpecificationController = container.resolve(
      CreateCarSpecificationUseCase,
    );

    const car = await createCarSpecificationController.execute({
      carId,
      specificationsId,
    });

    return response.status(201).json(car);
  }
}

export default CreateCarSpecificationController;
