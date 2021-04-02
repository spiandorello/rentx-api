import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICreateCarDto from '@modules/cars/dtos/ICreateCarDto';

interface ICarsRepository {
    findByLicensePlate(licensePlate: string): Promise<Car | undefined>
    create(data: ICreateCarDto): Promise<Car>;
}

export default ICarsRepository;
