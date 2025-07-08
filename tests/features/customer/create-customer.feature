Feature: Customer Registration

  Scenario: Successfully create a new customer
    Given a valid customer with the following data:
      | FirstName        | LastName      | DateOfBirth | PhoneNumber     | Email                     | BankAccountNumber    |
      | Alexander        | Hamilton      | 1982-01-01  | +14165551234    | alex.hamilton@example.com | GB82WEST12345698765432 |
    When the client sends a request to create the customer
    Then the customer should be saved in the system
    And a 201 Created response should be returned
