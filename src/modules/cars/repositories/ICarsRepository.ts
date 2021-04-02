import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICreateCarDto from '@modules/cars/dtos/ICreateCarDto';

interface ICarsRepository {
    findAvailable(name?: string, brand?: string, categoryId?: string): Promise<Car[]>
    findByLicensePlate(licensePlate: string): Promise<Car | undefined>
    create(data: ICreateCarDto): Promise<Car>;
}

export default ICarsRepository;
