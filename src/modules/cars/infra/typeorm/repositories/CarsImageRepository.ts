import { getRepository, Repository } from 'typeorm';

import CarImage from '@modules/cars/infra/typeorm/entities/CarImage';
import ICarsImageRepository from '@modules/cars/repositories/ICarsImageRepository';

class CarsRepository implements ICarsImageRepository {
    private repository: Repository<CarImage>

    constructor() {
        this.repository = getRepository(CarImage);
    }

    async create(carId: string, imageName: string): Promise<CarImage> {
        const carImage = this.repository.create({
            carId,
            name: imageName
        });

        return this.repository.save(carImage);
    }
}

export default CarsRepository;
