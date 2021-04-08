import { getRepository, Repository } from 'typeorm';

import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import ICreateRentalDto from '@modules/rentals/dtos/ICreateRentalDto';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findOpenRentalByCar(carId: string): Promise<Rental | undefined> {
        return this.repository.findOne({
            where: {
                carId,
                finishAt: null
            }
        });

    }
    async findOpenRentalByUser(userId: string): Promise<Rental | undefined> {
        return this.repository.findOne({
            where: {
                userId,
                finishAt: null
            }
        });
    }

    async create(rentalData : ICreateRentalDto): Promise<Rental> {

        const rental = this.repository.create(rentalData);

        await this.repository.save(rental);

        return rental;
    }

    async findOpenRentalByIdAndUserId(id: string, userId: string):Promise<Rental | undefined> {
        return this.repository.findOne({
            where: {
                id,
                userId: userId,
                finishAt: null
            }
        });
    }
}

export default RentalsRepository;
