import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import ICreateRentalDto from '@modules/rentals/dtos/ICreateRentalDto';

interface IRentalsRepository {
    findOpenRentalByCar(carId: string): Promise<Rental | undefined>;
    findOpenRentalByUser(userId: string): Promise<Rental | undefined>;
    create(data: ICreateRentalDto): Promise<Rental>;
}

export default IRentalsRepository;
