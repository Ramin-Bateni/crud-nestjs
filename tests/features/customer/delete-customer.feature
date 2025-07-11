Feature: Delete customer
  Scenario: Successfully delete a customer
    Given an existing customer for delete:
      | firstName | lastName | dateOfBirth | phoneNumber  | email                  | bankAccountNumber      |
      | Mark      | Twain    | 1970-04-24  | +447912345678 | mark.twain@example.com | GB11BARC20040122222222 |
    When I delete the customer
    Then after customer delete, the API should respond with status 204
    And the error message should contain "The customer deleted"
    And the customer should no longer exist
