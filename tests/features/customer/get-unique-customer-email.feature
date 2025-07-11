Feature: Unique Customer Emails

  Scenario: Prevent duplicate customer email

    Given the following customer already exists
      | firstName | lastName | dateOfBirth | phoneNumber  | email                  | bankAccountNumber           |
      | John      | Doe      | 1990-05-15  | +447911123456| john.doe@example.com   | GB11BARC20040155555555      |

    When I try to create another customer with same email

    Then the API should respond with status 409 .unique-customer-emails
    And the duplication error message should contain "Duplicate Email"
