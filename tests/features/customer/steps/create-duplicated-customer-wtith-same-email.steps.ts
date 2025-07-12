import { When } from "@cucumber/cucumber";
import request from "supertest";
import { CustomWorld } from "tests/support/custom-world";

When(
  "I try to create another customer with same email",
  async function (this: CustomWorld) {
    this.response = await request(this.app.getHttpServer())
      .post("/customers")
      .send({
        ...this.firstCustomer,
        firstName: "Martin",
      });
  }
);
