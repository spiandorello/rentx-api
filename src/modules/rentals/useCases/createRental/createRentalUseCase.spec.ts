import CreateRentalUseCase from '@modules/rentals/useCases/createRental/createRentalUseCase';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import RentalsRepositoryInMemory from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';

import ICreateRentalDto from '@modules/rentals/dtos/ICreateRentalDto';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import AppError from '@shared/errors/AppError';
import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let dateProvider: IDateProvider;
let carsRepository: ICarsRepository;
let rentalsRepository: IRentalsRepository;
let createRentalUseCase: CreateRentalUseCase;


describe("Create rental", () => {
   beforeEach(() => {
       dateProvider = new DayjsDateProvider();
       carsRepository = new CarsRepositoryInMemory();
       rentalsRepository = new RentalsRepositoryInMemory();
       createRentalUseCase = new CreateRentalUseCase(rentalsRepository, carsRepository, dateProvider);
   });

    it('should be able to create a new rental', async () => {

        const car = await carsRepository.create({
            name: "Car test",
            description: "A new car test",
            brand: "TEST",
            fineAmount: 1234,
            dailyRate: 100,
            licensePlate: "1234",
            categoryId: "13412342134"
        });

        const rental: ICreateRentalDto = {
            userId: "12345",
            carId: car.id,
            startAt: new Date(3021, 5, 5),
            expectReturnDate: new Date(3021, 5, 6)
        };

        const newRental = await createRentalUseCase.execute(rental);

        expect(newRental).toHaveProperty('id');
        expect(newRental).toHaveProperty('startAt');
    });

    it('should not be able to create a new rental when user has an open one', async () => {
        const car = await carsRepository.create({
            name: "Car test",
            description: "A new car test",
            brand: "TEST",
            fineAmount: 1234,
            dailyRate: 100,
            licensePlate: "1234",
            categoryId: "13412342134"
        });

        const rentalOne: ICreateRentalDto = {
            userId: "sameUser",
            carId: car.id,
            startAt: new Date(3021, 5, 5),
            expectReturnDate: new Date(3021, 5, 6)
        };

        await createRentalUseCase.execute(rentalOne);

        const rental: ICreateRentalDto = {
            userId: "sameUser",
            carId: car.id,
            startAt: new Date(3021, 5, 5),
            expectReturnDate: new Date(3021, 5, 6)
        };

        await expect(createRentalUseCase.execute(rental))
            .rejects
            .toBeInstanceOf(AppError);
    });

    it('should not be able to create a new rental when car has an open one', async () => {
        const car = await carsRepository.create({
            name: "Car test",
            description: "A new car test",
            brand: "TEST",
            fineAmount: 1234,
            dailyRate: 100,
            licensePlate: "1234",
            categoryId: "13412342134"
        });

        const rentalOne: ICreateRentalDto = {
            userId: "123123",
            carId: car.id,
            startAt: new Date(3021, 5, 5),
            expectReturnDate: new Date(3021, 5, 6)
        };

        await createRentalUseCase.execute(rentalOne);

        const rental: ICreateRentalDto = {
            userId: "132413241234",
            carId: car.id,
            startAt: new Date(3021, 5, 5),
            expectReturnDate: new Date(3021, 5, 6)
        };

        await expect(createRentalUseCase.execute(rental))
            .rejects
            .toBeInstanceOf(AppError);
    });

    it('should not be able to create a new rental on past', async () => {
        const car = await carsRepository.create({
            name: "Car test",
            description: "A new car test",
            brand: "TEST",
            fineAmount: 1234,
            dailyRate: 100,
            licensePlate: "1234",
            categoryId: "13412342134"
        });

        const rental: ICreateRentalDto = {
            userId: "123123",
            carId: car.id,
            startAt: new Date(2020, 5, 30),
            expectReturnDate: new Date(3021, 5, 6)
        };

        await expect(createRentalUseCase.execute(rental))
            .rejects
            .toBeInstanceOf(AppError);
    });

    it('should not be able to create a new rental with expect return date less than one day', async () => {
        const car = await carsRepository.create({
            name: "Car test",
            description: "A new car test",
            brand: "TEST",
            fineAmount: 1234,
            dailyRate: 100,
            licensePlate: "1234",
            categoryId: "13412342134"
        });

        const rental: ICreateRentalDto = {
            userId: car.id,
            carId: "carOne",
            startAt: new Date(3021, 5, 6),
            expectReturnDate: new Date(3021, 5, 6, 12, 0, 0),
        };

        await expect(createRentalUseCase.execute(rental))
            .rejects
            .toBeInstanceOf(AppError);
    });
});
