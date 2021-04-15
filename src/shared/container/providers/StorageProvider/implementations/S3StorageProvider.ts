import fs from 'fs';
import { S3 } from 'aws-sdk';
import { resolve } from 'path';
import mime  from 'mime';

import IStorageProvider from '@shared/container/providers/StorageProvider/IStorageProvider';
import upload from "@config/upload";

class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }

    async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalName);

        // @ts-ignore
        await this.client.putObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            ACL: 'public-read',
            Body: fileContent,
            ContentType: mime.getType(file)
        }).promise();

        await fs.promises.unlink(originalName);

        return file
    }

    async delete(file: string, folder: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
        }).promise();
    }
}

export default S3StorageProvider;
