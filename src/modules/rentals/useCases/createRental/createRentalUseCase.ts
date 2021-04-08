import { injectable, inject } from 'tsyringe';

import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
    userId: string;
    carId: string;
    startAt: Date;
    expectReturnDate: Date;
}

@injectable()
class CreateRentalUseCase {

    static minRentalReturnDateInHours: number = 24;

    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        @inject('DateProvider')
        private dateProvider: IDateProvider,
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

        const diffStartAtDateAndExpectReturnDateInHours = this.dateProvider.compareInHours(startAt, expectReturnDate);
        if (diffStartAtDateAndExpectReturnDateInHours < CreateRentalUseCase.minRentalReturnDateInHours) {
            throw new AppError('Expect return date must be at least one day!');
        }

        await this.carsRepository.updateAvailable(carId, false);

        return this.rentalsRepository.create({
            userId,
            carId,
            startAt,
            expectReturnDate
        });
    }
}

export default CreateRentalUseCase;
