import { Given, When, Then } from "@cucumber/cucumber";
import request from "supertest";
import { expect } from "chai";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { getModelToken } from "@nestjs/mongoose";
import { Customer } from "@/modules/customer/infrastructure/repositories/schemas/customer.schema";

let app: INestApplication;
let response: request.Response;
let duplicatePayload: any;

Given("the following customer already exists", async function (dataTable: any) {
  // Make app ready to run -----------------------------------
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleRef.createNestApplication();
  await app.init();

  // Remove all old records from DB --------------------------
  const customerModel = app.get(getModelToken(Customer.name));
  await customerModel.deleteMany({});

  // Get customer data to post -------------------------------
  const customer = dataTable.hashes()[0];

  // First insert --------------------------------------------
  await request(app.getHttpServer())
    .post("/customers")
    .send(customer)
    .expect(201);

  // prepare duplicate payload (change only unique fields NOT in composite key)
  duplicatePayload = {
    ...customer,
    email: "other@example.com",
    bankAccountNumber: "GB00BARC00000000000000",
  };
});

When(
  "I try to create another customer with same firstName, lastName and dateOfBirth",
  async function () {
    response = await request(app.getHttpServer()).post("/customers").send({
      firstName: duplicatePayload.firstName,
      lastName: duplicatePayload.lastName,
      dateOfBirth: duplicatePayload.dateOfBirth,
      phoneNumber: duplicatePayload.phoneNumber,
      email: duplicatePayload.email,
      bankAccountNumber: duplicatePayload.bankAccountNumber,
    });
  }
);

Then("the API should respond with status 409", function () {
  expect(response.status).to.equal(409);
});
Then(`the error message should contain "duplicate customer"`, function () {
  expect(response.body.message).to.contain("duplicate customer");
});
