// tests/features/customer/steps/delete-customer.steps.ts
import { Given, When, Then } from "@cucumber/cucumber";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { expect } from "chai";
import { AppModule } from "../../../../src/app.module";

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
  "the API should respond with status {int} for delete",
  function (status: number) {
    expect(deleteResponse.status).to.equal(status);
  }
);

Then("the customer should not exist anymore", async function () {
  await request(app.getHttpServer())
    .get(`/customers/${customerId}`)
    .expect(404);

  await app.close();
});
