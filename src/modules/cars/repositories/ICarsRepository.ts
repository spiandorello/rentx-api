import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICreateCarDto from '@modules/cars/dtos/ICreateCarDto';

export default interface ICarsRepository {
  find(id: string): Promise<Car | undefined>;
  findAvailable(
    name?: string,
    brand?: string,
    categoryId?: string,
  ): Promise<Car[]>;
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
  create(data: ICreateCarDto): Promise<Car>;
  updateAvailable(carId: string, isAvailable: boolean): Promise<void>;
}
