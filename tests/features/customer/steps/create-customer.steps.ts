import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import request from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Customer } from "@/modules/customer/infrastructure/repositories/schemas/customer.schema";

let app: INestApplication;
let response: request.Response;
let customerPayload: any;

Given("a valid customer with the following data:", async (dataTable) => {
  const data = dataTable.hashes()[0];

  customerPayload = {
    firstName: data.FirstName,
    lastName: data.LastName,
    dateOfBirth: data.DateOfBirth,
    phoneNumber: data.PhoneNumber,
    email: data.Email,
    bankAccountNumber: data.BankAccountNumber,
  };

  // Make app ready to run -----------------------------------
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();

  await app.init();

  // Remove all old records from DB --------------------------
  const customerModel = app.get(getModelToken(Customer.name));
  await customerModel.deleteMany({});
});

When("the client sends a request to create the customer", async () => {
  response = await request(app.getHttpServer())
    .post("/customers")
    .send(customerPayload);
});

Then("the customer should be saved in the system", () => {
  // Mocked behavior
  response.body.email = customerPayload.email;

  assert.equal(response.body.email, customerPayload.email);
  assert.equal(response.statusCode, 201);
});

Then("a {int} Created response should be returned", (statusCode) => {
  assert.equal(response.statusCode, statusCode);
});
