import { When, AfterAll } from "@cucumber/cucumber";
import { INestApplication } from "@nestjs/common/interfaces/nest-application.interface";
import request from "supertest";
import { CustomWorld } from "tests/support/custom-world";

When(
  "I try to create another customer with same firstName, lastName and dateOfBirth",
  async function () {
    this.response = await request(this.app.getHttpServer())
      .post("/customers")
      .send({
        ...this.seed,
        email: "john.duplicate@example.com",
        bankAccountNumber: "GB11BARC20040199999999",
      });
  }
);
