import CarImage from '@modules/cars/infra/typeorm/entities/CarImage';

interface ICarsImageRepository {
  create(carId: string, imageName: string): Promise<CarImage>;
}

export default ICarsImageRepository;
