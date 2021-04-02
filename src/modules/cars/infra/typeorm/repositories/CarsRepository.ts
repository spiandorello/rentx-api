import { getRepository, Repository } from 'typeorm';

import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICreateCarDto from '@modules/cars/dtos/ICreateCarDto';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car);
    }

    async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
        return this.repository.findOne({ licensePlate });
    }

    async create(data: ICreateCarDto): Promise<Car> {
        const car = new Car();

        Object.assign(car, data);

        return this.repository.save(car);
    }

    async findAvailable(name?: string, brand?: string, categoryId?: string): Promise<Car[]> {

        const qb = this.repository.createQueryBuilder('c')
            .where('is_available = true');

        if (name) {
            qb.andWhere('name = :name')
                .setParameters({ name });
        }

        if (brand) {
            qb.andWhere('brand = :brand')
                .setParameters({ brand });
        }

        if (categoryId) {
            qb.andWhere('category_id = :categoryId')
                .setParameters({ categoryId });
        }

        return qb.getMany();
    }
}

export default CarsRepository;
