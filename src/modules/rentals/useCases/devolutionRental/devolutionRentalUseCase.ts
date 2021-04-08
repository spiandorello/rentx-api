import { injectable, inject } from 'tsyringe';

import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
    userId: string;
    rentalId: string;
}

@injectable()
class DevolutionRentalUseCase {

    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        @inject('DateProvider')
        private dateProvider: IDateProvider,
    ) {}

    async execute({ userId, rentalId }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findOpenRentalByIdAndUserId(rentalId, userId);
        if (!rental) {
            throw new AppError('This rental is not assignment fot this user.')
        }

        const car = await this.carsRepository.find(rental.carId);
        if (!car) {
            throw new AppError('This car not found');
        }

        const now = new Date();
        let dailies = this.dateProvider.compareInDays(
            rental.startAt,
            now
        );

        if (dailies <= 0) {
            dailies = 1;
        }

        const returnDelayInDays = this.dateProvider.compareInDays(
            rental.expectReturnDate,
            now
        );

        let fineAmount = 0;
        if (returnDelayInDays > 0) {
            fineAmount = car.fineAmount * returnDelayInDays;
        }

        const total = car.dailyRate * dailies + fineAmount;

        await this.carsRepository.updateAvailable(rental.carId, true);

        return this.rentalsRepository.create({
            ...rental,
            total,
            finishAt: now,
        });

    }
}

export default DevolutionRentalUseCase;
