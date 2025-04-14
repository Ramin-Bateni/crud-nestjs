import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    dataSource = moduleFixture.get(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });

  it('POST /customers - success', async () => {
    const dto = {
      firstName: 'Alice',
      lastName: 'Smith',
      dateOfBirth: '1991-12-12',
      phoneNumber: '+989123456789',
      email: 'alice@example.com',
      bankAccountNumber: '1234567890',
    };

    const response = await request(app.getHttpServer())
      .post('/customers')
      .send(dto)
      .expect(201);

    expect(response.body).toMatchObject({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
    });
  });

  it('POST /customers - duplicate email', async () => {
    const dto = {
      firstName: 'Bob',
      lastName: 'Smith',
      dateOfBirth: '1980-01-01',
      phoneNumber: '+15555555555',
      email: 'alice@example.com', // already used
      bankAccountNumber: '9876543210',
    };

    const response = await request(app.getHttpServer())
      .post('/customers')
      .send(dto)
      .expect(409);

    expect((response.body as { message: string }).message).toContain(
      'Email already exists',
    );
  });
});
