import { Given, When, Then, BeforeAll } from '@cucumber/cucumber';
import { expect } from 'chai';
import * as supertest from 'supertest';
import { Customer } from '../../src/modules/customer/entities/customer.entity';
import dataSource from '../../src/scripts/typeorm-data-source';

const API = supertest('http://localhost:3000');

let response: supertest.Response;
let payload: Record<string, any> = {};

BeforeAll(async () => {
  await dataSource.initialize();
});

Given('the system is running', async () => {
  const res = await API.get('/health').catch(() => null);
  expect(res?.status).to.equal(200);
});

Given('the database is empty', async () => {
  await dataSource.getRepository(Customer).clear();
});

Given('I have a valid customer payload', () => {
  payload = {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '2025-07-06T21:46:52.689Z',
    email: 'john@example.com',
    phoneNumber: '+989012883045',
    bankAccountNumber: 'DE89370400440532013000',
  };
});

Given(
  'I have a valid customer payload with email {string}',
  function (email: string) {
    payload = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '2025-07-06T21:46:52.689Z',
      email,
      phoneNumber: '+989012883045',
      bankAccountNumber: 'DE89370400440532013000',
    };
  },
);

Given(
  'I have a valid customer payload with firstName {string}, lastName {string}, and dateOfBirth {string}',
  function (firstName: string, lastName: string, dateOfBirth: string) {
    payload = {
      firstName,
      lastName,
      dateOfBirth,
      email: 'john@example.com',
      phoneNumber: '+989012883045',
      bankAccountNumber: 'DE89370400440532013000',
    };
  },
);

Given(
  'a customer already exists with email {string}',
  async (email: string) => {
    const res = await API.post('/customers').send({
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: '2025-07-06T21:46:52.689Z',
      email,
      phoneNumber: '+989012883045',
      bankAccountNumber: 'GB12BARC20201530093459',
    });
    expect(res.status).to.equal(201);
  },
);

Given(
  'a customer already exists with firstName {string}, lastName {string}, and dateOfBirth {string}',
  async (first: string, last: string, dob: string) => {
    const res = await API.post('/customers').send({
      firstName: first,
      lastName: last,
      dateOfBirth: dob,
      email: `${first}.${last}@example.com`,
      phoneNumber: '+989012883045',
      bankAccountNumber: 'FR7630006000011234567890189',
    });
    expect(res.status).to.equal(201);
  },
);

Given(
  'I have a customer payload with invalid {string} as {string}',
  (field, value) => {
    payload = {
      firstName: 'Alice',
      lastName: 'Walker',
      dateOfBirth: '2025-07-06T21:46:52.689Z',
      email: 'alice@example.com',
      phoneNumber: '+14155552674',
      bankAccountNumber: 'NL91ABNA0417164300',
    };
    payload[field] = value;
  },
);

Given('a customer exists with ID {string}', async (id: string) => {
  const customer = new Customer();
  customer.id = id;
  customer.firstName = 'Alice';
  customer.lastName = 'Walker';
  customer.dateOfBirth = new Date();
  customer.email = 'alice@example.com';
  customer.phoneNumber = '+989012883044';
  customer.bankAccountNumber = 'NL91ABNA0417164300';

  await dataSource.getRepository(Customer).save(customer);

  const res = await API.get(`/customers/${id}`);
  expect(res.status).to.equal(200);
});

Given('I have an updated valid payload', () => {
  payload = {
    email: 'updated@example.com',
    phoneNumber: '+989012883045',
    bankAccountNumber: 'DE12500105170648489890',
  };
});

When('I send a POST request to {string}', async (path: string) => {
  response = await API.post(path).send(payload);
});

When('I send a GET request to {string}', async (path: string) => {
  response = await API.get(path);
});

When('I send a PATCH request to {string}', async (path: string) => {
  response = await API.patch(path).send(payload);
});

When('I send a DELETE request to {string}', async (path: string) => {
  response = await API.delete(path);
});

Then('I should receive a {int} response', (code: number) => {
  expect(response.status).to.equal(code);
});

Then('the response body contains the customer ID and data', () => {
  expect(response.body).to.have.property('id');
  expect(response.body.email).to.equal(payload.email);
});

Then(
  'the response body contains an error message about {string}',
  (thing: string) => {
    expect(response.body.message).to.include(thing);
  },
);

Then('the response body contains the customer data', () => {
  expect(response.body).to.have.property('email');
  expect(response.body.email).to.include('@');
});

Then('the response body contains the updated customer data', function () {
  expect(response.body.email).to.equal('updated@example.com');
  expect(response.body.phoneNumber).to.equal('+989012883045');
  expect(response.body.bankAccountNumber).to.equal('DE12500105170648489890');
});

Then('the customer no longer exists with ID {string}', async (id: string) => {
  const res = await API.get(`/customers/${id}`);
  expect(res.status).to.equal(404);
});
