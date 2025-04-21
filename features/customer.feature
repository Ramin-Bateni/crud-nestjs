Feature: Customer API
  As an API user
  I want to manage customer data
  So that I can maintain customer information

  Scenario: Retrieve a customer with valid UUID
    Given a customer exists in the system with id "550e8400-e29b-41d4-a716-446655440000"
    When I request to get the customer by id "550e8400-e29b-41d4-a716-446655440000"
    Then I should receive a status code of 200
    And I should receive the customer details

  Scenario: Retrieve a customer with invalid UUID
    When I request to get the customer by id "invalid-uuid"
    Then I should receive a status code of 400
    And I should receive an error message about invalid UUID format

  Scenario: Create a new customer
    When I request to create a customer with valid data
    Then I should receive a status code of 201
    And I should receive the created customer details

  Scenario: Update an existing customer
    Given a customer exists in the system with id "550e8400-e29b-41d4-a716-446655440000"
    When I request to update the customer with id "550e8400-e29b-41d4-a716-446655440000"
    Then I should receive a status code of 200
    And I should receive the updated customer details

  Scenario: Delete an existing customer
    Given a customer exists in the system with id "550e8400-e29b-41d4-a716-446655440000"
    When I request to delete the customer with id "550e8400-e29b-41d4-a716-446655440000"
    Then I should receive a status code of 200 