import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import * as supertest from 'supertest';

const API = supertest('http://localhost:3000');

let response: supertest.Response;
let payload: Record<string, any> = {};

Given('the system is running', async () => {
  const res = await API.get('/health').catch(() => null);
  expect(res?.status).to.equal(200);
});

Given('I have a valid customer payload', () => {
  payload = {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    email: 'john@example.com',
    phoneNumber: '+14155552671',
    bankAccountNumber: 'DE89370400440532013000',
  };
});

Given(
  'a customer already exists with email {string}',
  async (email: string) => {
    const res = await API.post('/customers').send({
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: '1990-01-01',
      email,
      phoneNumber: '+14155552672',
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
      phoneNumber: '+14155552673',
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
      dateOfBirth: '1985-05-05',
      email: 'alice@example.com',
      phoneNumber: '+14155552674',
      bankAccountNumber: 'NL91ABNA0417164300',
    };
    payload[field] = value;
  },
);

Given('a customer exists with ID {string}', async (id: string) => {
  const res = await API.post('/customers').send({
    firstName: 'Temp',
    lastName: 'User',
    dateOfBirth: '2000-01-01',
    email: `temp.${id}@example.com`,
    phoneNumber: '+14155552675',
    bankAccountNumber: 'CH9300762011623852957',
  });
  expect(res.status).to.equal(201);
});

Given('I have an updated valid payload', () => {
  payload = {
    firstName: 'Updated',
    lastName: 'Customer',
    dateOfBirth: '1995-10-10',
    email: 'updated@example.com',
    phoneNumber: '+14155552699',
    bankAccountNumber: 'DE12500105170648489890',
  };
});

When('I send a POST request to {string}', async (path: string) => {
  response = await API.post(path).send(payload);
});

When('I send a GET request to {string}', async (path: string) => {
  response = await API.get(path);
});

When('I send a PUT request to {string}', async (path: string) => {
  response = await API.put(path).send(payload);
});

When('I send a DELETE request to {string}', async (path: string) => {
  response = await API.delete(path);
});

Then('I should receive a {int} {word} response', (code: number) => {
  expect(response.status).to.equal(code);
});

Then('the response body contains the customer ID and data', () => {
  expect(response.body).to.have.property('id');
  expect(response.body.email).to.equal(payload.email);
});

Then(
  'the response body contains an error message for {string}',
  (field: string) => {
    expect(response.body.message).to.be.a('string').that.includes(field);
  },
);

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

Then('the customer no longer exists with ID {string}', async (id: string) => {
  const res = await API.get(`/customers/${id}`);
  expect(res.status).to.equal(404);
});
