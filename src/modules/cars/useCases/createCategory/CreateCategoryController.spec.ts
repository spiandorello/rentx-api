import request from 'supertest';
import { hash } from 'bcryptjs';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('Create category controller', () => {
  beforeAll(async done => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash('admin', 8);

    await connection.query(`INSERT INTO users(name, email, password, is_admin, driver_license)
            VALUES ('Admin', 'admin@rentx.com.br', '${password}', true, 'XXX')`);
    done();
  });

  afterAll(async done => {
    await connection.dropDatabase();
    await connection.close();
    done();
  });

  it('[POST] should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body;

    request(app)
      .post('/categories')
      .send({
        name: 'Categories super tes',
        description: 'Categories super tes',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
      .expect(201);
  });

  it('[POST] should be not able to create a category with same name', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body;

    request(app)
      .post('/categories')
      .send({
        name: 'Categories super tes',
        description: 'Categories super tes',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
      .expect(400);
  });
});
