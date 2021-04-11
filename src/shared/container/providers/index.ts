import { container } from 'tsyringe';

import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

import IMailProvider from '@shared/container/providers/MailProvider/IEmailProvider';
import EtherealMailProvider
    from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider/EtherealMailProvider';

container.registerSingleton<IDateProvider>(
    'DateProvider',
    DayjsDateProvider
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    new EtherealMailProvider()
);
