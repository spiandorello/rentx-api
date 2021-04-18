import { hash } from 'bcryptjs';

import createConnection from '../index';

async function create(): Promise<void> {
  const connection = await createConnection();

  const password = await hash('admin', 8);

  await connection.query(`INSERT INTO users(name, email, password, is_admin, driver_license)
        VALUES ('Admin', 'admin@rentx.com.br', '${password}', true, 'XXX')`);
}

// eslint-disable-next-line no-console
create().then(() => console.log('Admin created'));
