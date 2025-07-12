// tests/features/customer/steps/get-all-customers.steps.ts

import { When, Then } from "@cucumber/cucumber";
import request from "supertest";
import { expect } from "chai";
import { CustomWorld } from "tests/support/custom-world";

When("I send a GetAllCustomersQuery", async function (this: CustomWorld) {
  // I hit the real REST endpoint, which internally triggers the query handler
  this.response = await request(this.app.getHttpServer())
    .get("/customers")
    .expect(200);
});

Then(
  "I should receive a list of all customers",
  async function (this: CustomWorld) {
    expect(this.response.body).to.deep.equal(this.seed);
  }
);
