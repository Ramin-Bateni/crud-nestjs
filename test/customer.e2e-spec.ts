import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getConnection } from 'typeorm';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;
  let customerId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();

    try {
      const connection = getConnection();
      const entities = connection.entityMetadatas;

      for (const entity of entities) {
        const repository = connection.getRepository(entity.name);
        await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE;`);
      }
    } catch (error) {
      console.error('Error cleaning database', error);
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a customer', () => {
    return request(app.getHttpServer())
      .post('/customers')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        phoneNumber: '+1234567890',
        email: 'john.doe@example.com',
        bankAccountNumber: '12345678901234',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.firstName).toBe('John');
        expect(response.body.lastName).toBe('Doe');
        expect(response.body.email).toBe('john.doe@example.com');
        customerId = response.body.id;
      });
  });

  it('should not create a customer with invalid phone number', () => {
    return request(app.getHttpServer())
      .post('/customers')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        dateOfBirth: '1991-01-01',
        phoneNumber: 'invalidnumber',
        email: 'jane.doe@example.com',
        bankAccountNumber: '12345678901234',
      })
      .expect(400);
  });

  it('should not create a customer with invalid bank account', () => {
    return request(app.getHttpServer())
      .post('/customers')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        dateOfBirth: '1991-01-01',
        phoneNumber: '+1234567890',
        email: 'jane.doe@example.com',
        bankAccountNumber: 'abc',
      })
      .expect(400);
  });

  it('should get all customers', () => {
    return request(app.getHttpServer())
      .get('/customers')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
      });
  });

  it('should get a customer by id', () => {
    return request(app.getHttpServer())
      .get(`/customers/${customerId}`)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(customerId);
        expect(response.body.firstName).toBe('John');
      });
  });

  it('should update a customer', () => {
    return request(app.getHttpServer())
      .put(`/customers/${customerId}`)
      .send({
        firstName: 'Johnny',
      })
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(customerId);
        expect(response.body.firstName).toBe('Johnny');
        expect(response.body.lastName).toBe('Doe');
      });
  });

  it('should delete a customer', () => {
    return request(app.getHttpServer())
      .delete(`/customers/${customerId}`)
      .expect(200);
  });

  it('should not find a deleted customer', () => {
    return request(app.getHttpServer())
      .get(`/customers/${customerId}`)
      .expect(404);
  });
});
