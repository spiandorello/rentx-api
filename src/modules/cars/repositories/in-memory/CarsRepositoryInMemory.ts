import { v4 as uuidv4 } from 'uuid';

import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICreateCarDto from '@modules/cars/dtos/ICreateCarDto';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[];

    constructor() {
        this.cars = [];
    }

    async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
        return this.cars.find(car => car.licensePlate = licensePlate)
    }

    async create(data: ICreateCarDto): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            id: uuidv4(),
            ...data,
            isAvailable: true,
            createdAt: new Date(),
        });

        this.cars.push(car)

        return car;
    }
}

export default CarsRepositoryInMemory;
