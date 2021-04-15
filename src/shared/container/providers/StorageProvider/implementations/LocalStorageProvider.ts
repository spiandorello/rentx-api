import fs from 'fs';
import { resolve } from 'path';

import upload from '@config/upload';
import IStorageProvider from '@shared/container/providers/StorageProvider/IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(upload.tmpFolder, file),
            resolve(`${upload.tmpFolder}/${folder}`)
        );

        return file;
    }

    async delete(file: string, folder: string): Promise<void> {
        const filename = resolve(`${upload.tmpFolder}/${folder}`);

        try {
            await fs.promises.stat(filename);
        } catch (e) {
            return;
        }

        await fs.promises.unlink(filename);
    }
}

export default LocalStorageProvider;
