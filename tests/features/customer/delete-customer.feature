Feature: Delete customer
  Scenario: Successfully delete a customer
    Given an existing customer:
      | firstName | lastName | dateOfBirth | phoneNumber  | email                  | bankAccountNumber      |
      | Mark      | Twain    | 1970-04-24  | +14155552222 | mark.twain@example.com | GB11BARC20040122222222 |
    When I delete the customer
    Then the API should respond with status 204
    And the customer should no longer exist
