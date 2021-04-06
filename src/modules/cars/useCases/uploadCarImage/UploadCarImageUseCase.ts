import { injectable, inject } from "tsyringe";

import AppError from '@shared/errors/AppError';
import CarImage from '@modules/cars/infra/typeorm/entities/CarImage';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import ICarsImageRepository from '@modules/cars/repositories/ICarsImageRepository';

interface IRequest {
    imagesName: string[];
    carId: string;
}

@injectable()
class UploadCarImageUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,

        @inject('CarsImageRepository')
        private carsImageRepository: ICarsImageRepository
    ) {}

    async execute({
        imagesName,
        carId
    }: IRequest): Promise<void> {

        const carAlreadyExists = await this.carsRepository.find(carId);
        if (!carAlreadyExists) {
            throw new AppError('Car not found!');
        }

        imagesName.forEach(imageName => this.carsImageRepository.create(carId, imageName));
    }
}

export default UploadCarImageUseCase;
