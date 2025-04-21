import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { expect } from 'chai';
import { DataSource } from 'typeorm';

const validCustomerData = {
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  phoneNumber: '+919898989898',
  email: 'john.doe@example.com',
  bankAccountNumber: '123456789012',
};

const updatedCustomerData = {
  firstName: 'Jane',
  lastName: 'Smith',
};

let app: INestApplication;
let testRequest: any;
let response: request.Response;
let customerId: string;

Before(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  testRequest = request(app.getHttpServer());

  const dataSource = app.get(DataSource);
  await dataSource.synchronize(true);
});

After(async () => {
  await app.close();
});

Given(
  'a customer exists in the system with id {string}',
  async (id: string) => {
    const createResponse = await testRequest
      .post('/customers')
      .send(validCustomerData)
      .expect(201);

    customerId = createResponse.body.id;
  },
);

When('I request to get the customer by id {string}', async (id: string) => {
  const idToUse =
    id === '550e8400-e29b-41d4-a716-446655440000' ? customerId : id;
  response = await testRequest.get(`/customers/${idToUse}`);
});

When('I request to create a customer with valid data', async () => {
  response = await testRequest.post('/customers').send(validCustomerData);
});

When(
  'I request to update the customer with id {string}',
  async (id: string) => {
    const idToUse =
      id === '550e8400-e29b-41d4-a716-446655440000' ? customerId : id;
    response = await testRequest
      .put(`/customers/${idToUse}`)
      .send(updatedCustomerData);
  },
);

When(
  'I request to delete the customer with id {string}',
  async (id: string) => {
    const idToUse =
      id === '550e8400-e29b-41d4-a716-446655440000' ? customerId : id;
    response = await testRequest.delete(`/customers/${idToUse}`);
  },
);

Then('I should receive a status code of {int}', (statusCode: number) => {
  expect(response.status).to.equal(statusCode);
});

Then('I should receive the customer details', () => {
  expect(response.body).to.have.property('id');
  expect(response.body).to.have.property('firstName');
  expect(response.body).to.have.property('lastName');
  expect(response.body).to.have.property('email');
});

Then('I should receive an error message about invalid UUID format', () => {
  expect(response.body).to.have.property('message');
  expect(response.body.message).to.include('uuid');
});

Then('I should receive the created customer details', () => {
  expect(response.body).to.have.property('id');
  expect(response.body.firstName).to.equal(validCustomerData.firstName);
  expect(response.body.lastName).to.equal(validCustomerData.lastName);
  expect(response.body.email).to.equal(validCustomerData.email);
});

Then('I should receive the updated customer details', () => {
  expect(response.body).to.have.property('id');
  expect(response.body.firstName).to.equal(updatedCustomerData.firstName);
  expect(response.body.lastName).to.equal(updatedCustomerData.lastName);
});
