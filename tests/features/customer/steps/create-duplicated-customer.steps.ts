import { When } from "@cucumber/cucumber";
import request from "supertest";
import { CustomWorld } from "tests/support/custom-world";

When(
  "I try to create another customer with same firstName, lastName and dateOfBirth of first customer",
  async function (this: CustomWorld) {
    this.response = await request(this.app.getHttpServer())
      .post("/customers")
      .send({
        ...this.firstCustomer,
        email: "john.duplicate@example.com",
        bankAccountNumber: "GB11BARC20040199999999",
      });
  }
);
