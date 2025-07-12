Feature: Customer Registration

  Scenario: Successfully create a new customer
    Given a valid customer with the following data:
      | FirstName        | LastName      | DateOfBirth | PhoneNumber     | Email                     | BankAccountNumber    |
      | Liam	           | Bennett       | 1992-11-05	 | +61412345678	   | liam.bennett@example.com	 | NL91ABNA0417164300  |
    When the client sends a request to create the customer
    Then the customer should be saved in the system
    And a 201 Created response should be returned
