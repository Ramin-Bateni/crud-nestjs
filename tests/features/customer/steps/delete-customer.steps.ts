// tests/features/customer/steps/delete-customer.steps.ts
import { Given, When, Then, AfterAll } from "@cucumber/cucumber";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { expect } from "chai";
import { AppModule } from "../../../../src/app.module";
import { CustomWorld } from "tests/support/custom-world";

let app: INestApplication;

let customerId: string;
let deleteResponse: request.Response;

Given("an existing customer for delete:", async function (table) {
  const payload = table.hashes()[0];

  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();

  const res = await request(app.getHttpServer())
    .post("/customers")
    .send(payload)
    .expect(201);

  customerId = res.body.id;
});

When("I delete the customer", async function () {
  deleteResponse = await request(app.getHttpServer()).delete(
    `/customers/${customerId}`
  );
});

Then(
  "after customer delete, the API should respond with status {int}",
  function (status: number) {
    expect(deleteResponse.status).to.equal(status);
  }
);

Then("the error message should contain {string}", function (msg: string) {
  expect(deleteResponse.body.message).to.contain(msg);
});

Then("the customer should no longer exist", async function () {
  await request(app.getHttpServer())
    .get(`/customers/${customerId}`)
    .expect(404);
});
