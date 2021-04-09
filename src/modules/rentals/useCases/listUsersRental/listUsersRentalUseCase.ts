import { injectable, inject } from 'tsyringe';

import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
    userId: string;
}

@injectable()
class ListUsersRentalUseCase {

    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository
    ) {}

    async execute({ userId }: IRequest): Promise<Rental[]> {
        const rentals = await this.rentalsRepository.findAllByUser(userId);
        if (!rentals) {
            throw new AppError('User dont have rentals');
        }

        return rentals;
    }
}

export default ListUsersRentalUseCase;
