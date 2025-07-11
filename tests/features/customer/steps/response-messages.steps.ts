import { Then } from "@cucumber/cucumber";
import { expect } from "chai";

Then(
  `the duplication error message should contain {string}`,
  async function (msg: string) {
    expect(this.response.body.message).to.contain(msg);
  }
);
