import AppError from '@shared/errors/AppError';
import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import CreateCarUseCase from '@modules/cars/useCases/createCar/CreateCarUseCase';
import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createCarUseCase: CreateCarUseCase;
let carsRepository: ICarsRepository;

describe('Create car use case', () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });

    it('should create a new car', async () => {
        const car = {
            name: 'Ferrari',
            description: 'Nave',
            dailyRate: 1000,
            licensePlate: 'AB0-1234',
            fineAmount: 100,
            brand: 'Ferrari',
            categoryId: 'ihuu'
        };

        const newCar = await createCarUseCase.execute(car);

        expect(newCar).toBeInstanceOf(Car);
        expect(newCar).toHaveProperty('id');
    });

    it('should not be to create a with more than one license plate', async () => {
        await createCarUseCase.execute({
            name: 'Ferrari',
            description: 'Nave',
            dailyRate: 1000,
            licensePlate: 'AB0-1234',
            fineAmount: 100,
            brand: 'Ferrari',
            categoryId: 'ihuu'
        });

        await expect(createCarUseCase.execute({
            name: 'Ferrari',
            description: 'Nave',
            dailyRate: 1000,
            licensePlate: 'AB0-1234',
            fineAmount: 100,
            brand: 'Ferrari',
            categoryId: 'ihuu'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to create a car with available true by default', async () => {
        const car = {
            name: 'Ferrari',
            description: 'Nave',
            dailyRate: 1000,
            licensePlate: 'AB0-1234',
            fineAmount: 100,
            brand: 'Ferrari',
            categoryId: 'ihuu'
        };

        const newCar = await createCarUseCase.execute(car);

        expect(newCar.isAvailable).toBeTruthy();
    });
});
