import { injectable, inject } from 'tsyringe';

import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
    userId: string;
    carId: string;
    startAt: Date;
    expectReturnDate: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
    ) {}

    async execute({ userId, carId, startAt, expectReturnDate }: IRequest): Promise<Rental> {

        const currentDate = new Date();
        if (currentDate > startAt) {
            throw new AppError('Can not create a rental on past');
        }

        const isCarUnavailable = await this.rentalsRepository.findOpenRentalByCar(carId);
        if (isCarUnavailable) {
            throw new AppError('Car is unavailable');
        }

        const isOpenRentalToUser = await this.rentalsRepository.findOpenRentalByUser(userId);
        if (isOpenRentalToUser) {
            throw new AppError('There is a rental in use for this user!');
        }

        return this.rentalsRepository.create({
            userId,
            carId,
            startAt,
            expectReturnDate
        });
    }
}

export default CreateRentalUseCase;
