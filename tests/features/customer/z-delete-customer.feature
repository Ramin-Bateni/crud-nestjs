Feature: Delete customer

  Scenario: Successfully delete a customer
    Given an existing customer for delete
      | FirstName | LastName  | DateOfBirth | PhoneNumber    | Email                     | BankAccountNumber        |
      | Bob       | Johnson   | 1975-05-20  | +31612345678   | bob.johnson@example.com   | IT60X0542811101000000123456   |
    When I delete the customer
    Then after customer delete, the API should respond with status 204
    And the customer should no longer exist
