import { Given, When, Then } from "@cucumber/cucumber";
import { GetAllCustomersQuery } from "@/modules/customer/application/queries/impl/get-all-customers.query";
import { GetAllCustomersQueryHandler } from "@/modules/customer/application/queries/impl/get-all-customers.query-handler";
import { strict as assert } from "assert";

let serviceMock: { findAll: () => Promise<any[]> };
let handler: GetAllCustomersQueryHandler;
let actualResult: any;
let exampleCustomers: any[];
let callCount: number;

Given("the following customers exist:", function (dataTable) {
  // Prepare example data from the feature table
  exampleCustomers = dataTable.hashes().map((row: any) => ({
    firstName: row.FirstName,
    lastName: row.LastName,
    dateOfBirth: row.DateOfBirth,
    phoneNumber: row.PhoneNumber,
    email: row.Email,
    bankAccountNumber: row.BankAccountNumber,
  }));

  callCount = 0;

  // Mock CustomerService.findAll to return our example data
  serviceMock = {
    findAll: async () => {
      callCount++;

      return exampleCustomers;
    },
  };

  // Create handler with mocked service
  handler = new GetAllCustomersQueryHandler(serviceMock as any);
});

When("I send a GetAllCustomersQuery", async function () {
  // Execute the query handler to fetch customers
  actualResult = await handler.execute(new GetAllCustomersQuery());
});

Then("I should receive a list of all customers", function () {
  // I check that the handler returns exactly the example customer list
  assert.deepEqual(actualResult, exampleCustomers);

  // I ensure service.findAll was called once
  assert.strictEqual(
    callCount,
    1,
    "CustomerService.findAll should be called once"
  );
});
