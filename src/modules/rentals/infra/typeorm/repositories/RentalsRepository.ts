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
        return this.repository.findOne({ carId });

    }
    async findOpenRentalByUser(userId: string): Promise<Rental | undefined> {
        return this.repository.findOne({ userId });
    }

    async create({
         userId,
         carId,
         startAt,
         expectReturnDate,
    }: ICreateRentalDto): Promise<Rental> {
        const rental = this.repository.create({
            userId,
            carId,
            startAt,
            expectReturnDate,
        });

        await this.repository.save(rental);

        return rental;
    }
}

export default RentalsRepository;
