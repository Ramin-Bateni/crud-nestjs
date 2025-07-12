// tests/features/common/steps/customer-fixtures.steps.ts
import request from "supertest";
import { Given, Then } from "@cucumber/cucumber";
import { getModelToken } from "@nestjs/mongoose";
import { CustomWorld, flatCustomer } from "tests/support/custom-world";
import { Customer } from "@/modules/customer/infrastructure/repositories/schemas/customer.schema";

// Given(
//   "the following customer already exists",
//   async function (this: CustomWorld, dataTable) {
//     // get and store model on world
//     this.customerModel = this.app.get(getModelToken(Customer.name));

//     // clean collection
//     await this.customerModel.deleteMany({});

//     // Store references
//     this.firstCustomer = dataTable.hashes()[0] as Customer;

//     // seed initial customer
//     await request(this.app.getHttpServer())
//       .post("/customers")
//       .send(this.firstCustomer)
//       .expect(201);
//   }
// );

Given(
  "the following customers already exists",
  async function (this: CustomWorld, table) {
    // get and store model on world
    this.customerModel = this.app.get(getModelToken(Customer.name));

    // clean collection
    await this.customerModel.deleteMany({});

    this.seed = table.hashes().map((row: any) => ({
      firstName: row.FirstName,
      lastName: row.LastName,
      dateOfBirth: row.DateOfBirth,
      phoneNumber: row.PhoneNumber,
      email: row.Email,
      bankAccountNumber: row.BankAccountNumber,
    }));

    // Bulk-insert seeds
    await this.customerModel.insertMany(this.seed);

    this.firstCustomer = this.seed[0];
  }
);

Then("go to next scenarios", function (this: CustomWorld) {
  console.log("---- WORLD SEED ----");
  console.log(JSON.stringify(this.seed, null, 2));

  console.log("---- FIRST CUSTOMER ----");
  console.log(JSON.stringify(this.firstCustomer, null, 2));

  console.log(
    "---- MONGO CUSTOMER MODEL EXISTENCE ---->> ",
    !!this.customerModel
  );
});
