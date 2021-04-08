import { getRepository, Repository } from 'typeorm';

import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICreateCarDto from '@modules/cars/dtos/ICreateCarDto';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import Specification from "@modules/cars/infra/typeorm/entities/Specification";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car);
    }

    async find(id: string): Promise<Car | undefined> {
        return this.repository.findOne(id);
    }

    async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
        return this.repository.findOne({ licensePlate });
    }

    async create({
         id,
         name,
         description,
         dailyRate,
         licensePlate,
         fineAmount,
         brand,
         categoryId,
         specifications,
    }: ICreateCarDto): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            dailyRate,
            licensePlate,
            fineAmount,
            brand,
            categoryId,
            specifications,
            id
        });

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

    async updateAvailable(carId: string, isAvailable: boolean): Promise<void> {
        await this.repository.createQueryBuilder('car')
            .update('cars')
            .set('is_available = :isAvailable')
            .where('id = :carId')
            .setParameter('isAvailable', isAvailable)
            .setParameter('carId', carId)
            .execute()

    }
}

export default CarsRepository;
