import { container } from 'tsyringe';

import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

container.registerSingleton<IDateProvider>(
    'DateProvider',
    DayjsDateProvider
);
