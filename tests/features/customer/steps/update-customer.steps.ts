// tests/features/customer/steps/update-customer.steps.ts
import { Given, When, Then, AfterAll } from "@cucumber/cucumber";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { expect } from "chai";
import { AppModule } from "../../../../src/app.module";
import { CustomWorld } from "tests/support/custom-world";

let app: INestApplication;

let originalCustomer: any;
let updateResponse: request.Response;

Given("an existing customer for update:", async function (table) {
  originalCustomer = table.hashes()[0];

  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();

  const res = await request(app.getHttpServer())
    .post("/customers")
    .send(originalCustomer)
    .expect(201);

  originalCustomer.id = res.body.id;
});

When(
  "I update the customer with new phoneNumber {string}",
  async function (newPhone: string) {
    const updateDto = { phoneNumber: newPhone };

    updateResponse = await request(app.getHttpServer())
      .put(`/customers/${originalCustomer.id}`)
      .send(updateDto);
  }
);

Then(
  "after customer update, the API should respond with status {int}",
  function (status: number) {
    expect(updateResponse.status).to.equal(status);
  }
);

Then(
  "the customer's phoneNumber should be {string}",
  async function (expectedPhone: string) {
    const res = await request(app.getHttpServer())
      .get(`/customers/${originalCustomer.id}`)
      .expect(200);

    expect(res.body.phoneNumber).to.equal(expectedPhone);
  }
);
