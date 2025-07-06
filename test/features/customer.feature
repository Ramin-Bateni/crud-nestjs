Feature: Customer management
  In order to manage customers
  As an API client
  I want to create, read, update, and delete customers with proper validation and uniqueness checks

  Background:
    Given the system is running

  # Create customer happy path
  Scenario: Create a valid customer
    Given I have a valid customer payload
    When I send a POST request to "/customers"
    Then I should receive a 201 Created response
    And the response body contains the customer ID and data

  # Validation errors on create
  Scenario Outline: Create customer with invalid data
    Given I have a customer payload with invalid <field> as "<value>"
    When I send a POST request to "/customers"
    Then I should receive a 400 Bad Request response
    And the response body contains an error message for "<field>"

    Examples:
      | field             | value            |
      | phoneNumber       | "123"            |
      | email             | "notanemail"     |
      | bankAccountNumber | "invalidbankacc" |

  # Uniqueness error on create
  Scenario: Create customer with duplicate email
    Given a customer already exists with email "john@example.com"
    And I have a valid customer payload with email "john@example.com"
    When I send a POST request to "/customers"
    Then I should receive a 409 Conflict response
    And the response body contains an error message about email uniqueness

  Scenario: Create customer with duplicate FirstName, LastName, and DateOfBirth
    Given a customer already exists with firstName "John", lastName "Doe", and dateOfBirth "1990-01-01"
    And I have a valid customer payload with firstName "John", lastName "Doe", and dateOfBirth "1990-01-01"
    When I send a POST request to "/customers"
    Then I should receive a 409 Conflict response
    And the response body contains an error message about customer uniqueness

  # Read customer
  Scenario: Get an existing customer by ID
    Given a customer exists with ID "123"
    When I send a GET request to "/customers/123"
    Then I should receive a 200 OK response
    And the response body contains the customer data

  Scenario: Get a non-existent customer by ID
    When I send a GET request to "/customers/999"
    Then I should receive a 404 Not Found response

  # Update customer happy path
  Scenario: Update a customer with valid data
    Given a customer exists with ID "123"
    And I have an updated valid payload
    When I send a PUT request to "/customers/123"
    Then I should receive a 200 OK response
    And the response body contains the updated customer data

  # Delete customer
  Scenario: Delete an existing customer
    Given a customer exists with ID "123"
    When I send a DELETE request to "/customers/123"
    Then I should receive a 204 No Content response
    And the customer no longer exists with ID "123"

  Scenario: Delete a non-existent customer
    When I send a DELETE request to "/customers/999"
    Then I should receive a 404 Not Found response
