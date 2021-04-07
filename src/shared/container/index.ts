import { container } from 'tsyringe';

import ICategoryRepository from '@modules/cars/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';

import ISpecificationsRepository from '@modules/cars/repositories/ISpecificationsRepository';
import SpecificationsRepository from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';

import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';

import ICarsImageRepository from '@modules/cars/repositories/ICarsImageRepository';
import CarsImageRepository from '@modules/cars/infra/typeorm/repositories/CarsImageRepository';
import DayjsDateProvider from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

container.registerSingleton<ICarsRepository>(
    'CarsRepository',
    CarsRepository
);

container.registerSingleton<ICarsImageRepository>(
    'CarsImageRepository',
    CarsImageRepository
);

container.registerSingleton<ICategoryRepository>(
    'CategoriesRepository',
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    'SpecificationsRepository',
    SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);

container.registerInstance<IDateProvider>(
    'DateProvider',
    new DayjsDateProvider()
);
