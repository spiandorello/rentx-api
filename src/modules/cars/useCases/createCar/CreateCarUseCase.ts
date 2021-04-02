import { injectable, inject } from "tsyringe";

import AppError from '@shared/errors/AppError';
import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";



interface IRequest {
    name: string;
    description: string;
    dailyRate: number;
    licensePlate: string;
    fineAmount: number;
    brand: string;
    categoryId: string;
}

@injectable()
class CreateCarUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}

    async execute({
        name,
        description,
        dailyRate,
        licensePlate,
        fineAmount,
        brand,
        categoryId
    }: IRequest): Promise<Car> {

        const carAlreadyExists = await this.carsRepository.findByLicensePlate(licensePlate);
        if (carAlreadyExists) {
            throw new AppError('This car already exists!');
        }

        return await this.carsRepository.create({
            name,
            description,
            dailyRate,
            licensePlate,
            fineAmount,
            brand,
            categoryId
        });
    }
}

export default CreateCarUseCase;
