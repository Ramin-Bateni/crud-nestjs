// tests/features/customer/steps/delete-customer.steps.ts

import { Given, When, Then, After } from "@cucumber/cucumber";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { expect } from "chai";
import { AppModule } from "../../../../src/app.module";
import { flatCustomer } from "tests/support/custom-world";

let app: INestApplication;

let customerPayload: flatCustomer;
let deleteResponse: request.Response;

Given("an existing customer for delete", async function (table) {
  const data = table.hashes()[0];

  customerPayload = {
    firstName: data.FirstName,
    lastName: data.LastName,
    dateOfBirth: data.DateOfBirth,
    phoneNumber: data.PhoneNumber,
    email: data.Email,
    bankAccountNumber: data.BankAccountNumber,
  };

  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();

  const res = await request(app.getHttpServer())
    .post("/customers")
    .send(customerPayload)
    .expect(201);
});

When("I delete the customer", async function () {
  deleteResponse = await request(app.getHttpServer()).delete(
    `/customers/${customerPayload.email}`
  );
});

Then(
  "after customer delete, the API should respond with status {int}",
  function (status: number) {
    expect(deleteResponse.status).to.equal(status);
  }
);

Then("the customer should no longer exist", async function () {
  await request(app.getHttpServer())
    .get(`/customers/${customerPayload.email}`)
    .expect(404);
});

After(() => {
  if (app) {
    app.close();
  }
});
