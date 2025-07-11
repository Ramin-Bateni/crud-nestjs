// tests/features/common/steps/http-status.steps.ts
import { Then } from "@cucumber/cucumber";
import { expect } from "chai";

/**
 * Re-usable step for asserting HTTP status codes.
 * Expects `this.response` to be set in previous steps.
 */
Then("the API should respond with status {int}", function (status: number) {
  if (!this.response) throw new Error("Response object is undefined");

  expect(this.response.status).to.equal(status);
});
