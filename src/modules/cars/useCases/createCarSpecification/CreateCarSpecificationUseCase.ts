import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import ISpecificationsRepository from '@modules/cars/repositories/ISpecificationsRepository';

interface IRequest {
  carId: string;
  specificationsId: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ carId, specificationsId }: IRequest): Promise<Car> {
    const car = await this.carsRepository.find(carId);
    if (!car) {
      throw new AppError('Car does not exists');
    }

    car.specifications = await this.specificationsRepository.findByIds(
      specificationsId,
    );

    await this.carsRepository.create(car);

    return car;
  }
}

export default CreateCarSpecificationUseCase;
