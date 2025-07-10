Feature: Get Unique Customers

  Scenario: Prevent duplicate customer by firstName + lastName + dateOfBirth

    Given the following customer already exists
      | firstName | lastName | dateOfBirth | phoneNumber  | email                  | bankAccountNumber           |
      | John      | Doe      | 1990-05-15  | +447911123456| john.doe@example.com   | GB11BARC20040155555555      |

    When I try to create another customer with same firstName, lastName and dateOfBirth

    Then the API should respond with status 409
    And the error message should contain "duplicate customer"
