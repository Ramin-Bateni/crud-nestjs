Feature: Update customer
  Scenario: Successfully update phone number
    Given an existing customer:
      | firstName | lastName | dateOfBirth | phoneNumber  | email                  | bankAccountNumber      |
      | Lily      | Evans    | 1991-03-10  | +14155552671 | lily.evans@example.com | GB11BARC20040111111111 |
    When I update the customer with new phoneNumber "+14155559999"
    Then the API should respond with status 200
    And the customer's phoneNumber should be "+14155559999"
