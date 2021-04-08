import { v4 as uuidv4 } from 'uuid';

import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import ICreateRentalDto from "@modules/rentals/dtos/ICreateRentalDto";

class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = [];

    async findOpenRentalByCar(carId: string): Promise<Rental | undefined> {
        return this.rentals.find(rental => rental.carId === carId && !rental.finishAt);
    }

    async findOpenRentalByUser(userId: string): Promise<Rental | undefined> {
        return this.rentals.find(rental => rental.userId === userId && !rental.finishAt);
    }

    async create({ userId, carId, startAt, expectReturnDate }: ICreateRentalDto): Promise<Rental> {

        const rental = new Rental();

        Object.assign(rental, {
            id: uuidv4(),
            userId,
            carId,
            startAt,
            expectReturnDate,
            total: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        this.rentals.push(rental);

        return rental;
    }

    async findOpenRentalByIdAndUserId(id: string, userId: string): Promise<Rental | undefined> {
        return this.rentals.find(rental => rental.id === id && rental.userId === userId);
    }
}

export default RentalsRepositoryInMemory;
