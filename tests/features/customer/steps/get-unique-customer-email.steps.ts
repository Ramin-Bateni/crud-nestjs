import { When, AfterAll } from "@cucumber/cucumber";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { CustomWorld } from "tests/support/custom-world";

When("I try to create another customer with same email", async function () {
  this.response = await request(this.app.getHttpServer())
    .post("/customers")
    .send({
      firstName: "Martin",
      ...this.seed,
    });
});
