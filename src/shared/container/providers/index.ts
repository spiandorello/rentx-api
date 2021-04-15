import { container } from 'tsyringe';

import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

import IMailProvider from '@shared/container/providers/MailProvider/IEmailProvider';
import EtherealMailProvider
    from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider/EtherealMailProvider';

import IStorageProvider from '@shared/container/providers/StorageProvider/IStorageProvider';
import LocalStorageProvider from '@shared/container/providers/StorageProvider/implementations/LocalStorageProvider';
import S3StorageProvider from "@shared/container/providers/StorageProvider/implementations/S3StorageProvider";

const diskProvider = {
    disk: LocalStorageProvider,
    s3: S3StorageProvider,
};

container.registerSingleton<IDateProvider>(
    'DateProvider',
    DayjsDateProvider
);


container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    // @ts-ignore
    diskProvider[process.env.STORAGE],
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    new EtherealMailProvider()
);
