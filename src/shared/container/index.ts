import { container } from 'tsyringe';

import ICategoryRepository from '../../modules/cars/repositories/ICategoriesRepository';
import CategoriesRepository from '../../modules/cars/repositories/implementations/CategoriesRepository';

import ISpecificationsRepository from '../../modules/cars/repositories/ISpecificationsRepository';
import SpecificationsRepository from '../../modules/cars/repositories/implementations/SpecificationsRepository';

container.registerSingleton<ICategoryRepository>(
    'CategoriesRepository',
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    'ISpecificationsRepository',
    SpecificationsRepository
);
