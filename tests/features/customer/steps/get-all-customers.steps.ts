// tests/features/customer/steps/get-all-customers.steps.ts
import { Given, When, Then } from "@cucumber/cucumber";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { expect } from "chai";

import { AppModule } from "../../../../src/app.module";
import { Customer } from "@/modules/customer/infrastructure/repositories/schemas/customer.schema";
import { getModelToken } from "@nestjs/mongoose";

let app: INestApplication;
let exampleCustomers: any[];
let response: request.Response;

Given("the following customers exist:", async function (table) {
  exampleCustomers = table.hashes().map((row: any) => ({
    firstName: row.FirstName,
    lastName: row.LastName,
    dateOfBirth: row.DateOfBirth,
    phoneNumber: row.PhoneNumber,
    email: row.Email,
    bankAccountNumber: row.BankAccountNumber,
  }));

  // Make app ready to run -----------------------------------
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();

  // use real Mongoose model to insert customers -------------
  const customerModel = app.get(getModelToken(Customer.name));

  await customerModel.deleteMany({});
  await customerModel.insertMany(exampleCustomers);
});

When("I send a GetAllCustomersQuery", async function () {
  // I hit the real REST endpoint, which internally triggers the query handler
  response = await request(app.getHttpServer()).get("/customers").expect(200);
});

Then("I should receive a list of all customers", async function () {
  expect(response.body).to.deep.equal(exampleCustomers);

  await app.close();
});
