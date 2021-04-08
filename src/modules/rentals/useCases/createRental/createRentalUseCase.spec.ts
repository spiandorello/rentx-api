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
        const rental: ICreateRentalDto = {
            userId: "12345",
            carId: "111",
            startAt: new Date(3021, 5, 5),
            expectReturnDate: new Date(3021, 5, 6)
        };

        const newRental = await createRentalUseCase.execute(rental);

        expect(newRental).toHaveProperty('id');
        expect(newRental).toHaveProperty('startAt');
    });

    it('should not be able to create a new rental when user has an open one', async () => {
        const rentalOne: ICreateRentalDto = {
            userId: "sameUser",
            carId: "111123",
            startAt: new Date(3021, 5, 5),
            expectReturnDate: new Date(3021, 5, 6)
        };

        await createRentalUseCase.execute(rentalOne);

        const rental: ICreateRentalDto = {
            userId: "sameUser",
            carId: "12341231234",
            startAt: new Date(3021, 5, 5),
            expectReturnDate: new Date(3021, 5, 6)
        };

        await expect(createRentalUseCase.execute(rental))
            .rejects
            .toBeInstanceOf(AppError);
    });

    it('should not be able to create a new rental when car has an open one', async () => {
        const rentalOne: ICreateRentalDto = {
            userId: "123123",
            carId: "carOne",
            startAt: new Date(3021, 5, 5),
            expectReturnDate: new Date(3021, 5, 6)
        };

        await createRentalUseCase.execute(rentalOne);

        const rental: ICreateRentalDto = {
            userId: "132413241234",
            carId: "carOne",
            startAt: new Date(3021, 5, 5),
            expectReturnDate: new Date(3021, 5, 6)
        };

        await expect(createRentalUseCase.execute(rental))
            .rejects
            .toBeInstanceOf(AppError);
    });

    it('should not be able to create a new rental on past', async () => {
        const rental: ICreateRentalDto = {
            userId: "123123",
            carId: "carOne",
            startAt: new Date(2020, 5, 30),
            expectReturnDate: new Date(3021, 5, 6)
        };

        await expect(createRentalUseCase.execute(rental))
            .rejects
            .toBeInstanceOf(AppError);
    });

    it('should not be able to create a new rental with expect return date less than one day', async () => {
        const rental: ICreateRentalDto = {
            userId: "123123",
            carId: "carOne",
            startAt: new Date(3021, 5, 6),
            expectReturnDate: new Date(3021, 5, 6, 12, 0, 0),
        };

        await expect(createRentalUseCase.execute(rental))
            .rejects
            .toBeInstanceOf(AppError);
    });
});
