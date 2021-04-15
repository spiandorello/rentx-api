import { injectable, inject } from "tsyringe";

import AppError from '@shared/errors/AppError';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import ICarsImageRepository from '@modules/cars/repositories/ICarsImageRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/IStorageProvider';

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
        private carsImageRepository: ICarsImageRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) {}

    async execute({
        imagesName,
        carId
    }: IRequest): Promise<void> {

        const carAlreadyExists = await this.carsRepository.find(carId);
        if (!carAlreadyExists) {
            throw new AppError('Car not found!');
        }

        imagesName.map(async (imageName) => {
            await this.carsImageRepository.create(carId, imageName);
            await this.storageProvider.save(imageName, 'cars');
        });
    }
}

export default UploadCarImageUseCase;
