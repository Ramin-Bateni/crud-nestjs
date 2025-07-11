Feature: Update customer
  Scenario: Successfully update phone number
    Given an existing customer for update:
      | firstName | lastName | dateOfBirth | phoneNumber  | email                  | bankAccountNumber      |
      | Lily      | Evans    | 1991-03-10  | +447912345678 | lily.evans@example.com | GB11BARC20040111111111 |
    When I update the customer with new phoneNumber "+4915112345678"
    Then after customer update, the API should respond with status 200
    And the customer's phoneNumber should be "+4915112345678"
