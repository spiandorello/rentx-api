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

import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import RentalsRepository from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';

import IUserTokensRepository from '@modules/accounts/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository';

import '@shared/container/providers';

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarsImageRepository>(
  'CarsImageRepository',
  CarsImageRepository,
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);

container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);


container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
)
