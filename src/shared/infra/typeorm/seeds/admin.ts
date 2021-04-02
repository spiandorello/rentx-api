import { hash } from 'bcryptjs';

import createConnection from '../index';

async function create() {
    const connection = await createConnection();

    const password = await hash('admin', 8);

    await connection.query(`INSERT INTO users(name, email, password, is_admin, driver_license)
        VALUES ('Admin', 'admin@rentx.com.br', '${password}', true, 'XXX')`
    );
}

create().then(() => console.log('Admin created'));
