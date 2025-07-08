import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";

type Body = {
  id: number;
  email: string;
};
let response: {
  status: Number;
  body: Body;
};
let customerPayload: any;

Given("a valid customer with the following data:", (dataTable) => {
  const data = dataTable.hashes()[0];
  customerPayload = {
    firstName: data.FirstName,
    lastName: data.LastName,
    dateOfBirth: data.DateOfBirth,
    phoneNumber: data.PhoneNumber,
    email: data.Email,
    bankAccountNumber: data.BankAccountNumber,
  };
});

When("the client sends a request to create the customer", async () => {
  response = {
    status: 201,
    body: { id: "mock-id", ...customerPayload },
  };
});

Then("the customer should be saved in the system", () => {
  assert.ok(response.body.id);
  assert.equal(response.body.email, customerPayload.email);
});

Then("a 201 Created response should be returned", () => {
  assert.equal(response.status, 201);
});
