import { inject, injectable } from 'tsyringe';

import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

interface IQuery {
  name?: string;
  brand?: string;
  categoryId?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ name, brand, categoryId }: IQuery): Promise<Car[]> {
    return this.carsRepository.findAvailable(name, brand, categoryId);
  }
}

export default ListAvailableCarsUseCase;
