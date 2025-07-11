import { Given, When, Then } from "@cucumber/cucumber";
import request from "supertest";
import { expect } from "chai";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { getModelToken } from "@nestjs/mongoose";
import { Customer } from "@/modules/customer/infrastructure/repositories/schemas/customer.schema";
import { MongoDuplicateKeyFilter } from "@/modules/customer/presentation/http/filters/mongo-duplicate-key.filter";

let app: INestApplication;
let response: request.Response;
let duplicatePayload: any;

Given("the following customer already exists", async function (dataTable: any) {
  // Make app ready to run -----------------------------------
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleRef.createNestApplication();

  // To convert DB duplication error to HTTP 409
  app.useGlobalFilters(new MongoDuplicateKeyFilter());

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
    email: "john.duplicate@example.com",
    bankAccountNumber: "GB11BARC20040199999999",
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

Then("the API should respond with status {int}", function (statusCode: number) {
  expect(response.status).to.equal(statusCode);
});

Then(
  `the duplication error message should contain {string}`,
  async function (msg: string) {
    expect(response.body.message).to.contain(msg);

    await app.close();
  }
);
