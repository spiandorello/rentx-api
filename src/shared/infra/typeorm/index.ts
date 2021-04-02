import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async(host = 'rt-postgres'): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(Object.assign(
        defaultOptions,
        host
    ));
};
