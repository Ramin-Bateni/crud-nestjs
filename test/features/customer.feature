Feature: Customer management
  In order to manage customers
  As an API client
  I want to create, read, update, and delete customers with proper validation and uniqueness checks

  Background:
    Given the system is running
    And the database is empty

  # Create customer happy path
  Scenario: Create a valid customer
    Given I have a valid customer payload
    When I send a POST request to "/customers"
    Then I should receive a 201 response
    And the response body contains the customer ID and data

  # Validation errors on create
  Scenario Outline: Create customer with invalid data
    Given I have a customer payload with invalid <field> as <value>
    When I send a POST request to "/customers"
    Then I should receive a 400 response

    Examples:
      | field              | value            |
      | "phoneNumber"      | "123"            |
      | "email"            | "notanemail"     |
      | "bankAccountNumber"| "invalidbankacc" |

  # Uniqueness error on create
  Scenario: Create customer with duplicate email
    Given a customer already exists with email "john@example.com"
    And I have a valid customer payload with email "john@example.com"
    When I send a POST request to "/customers"
    Then I should receive a 409 response

  Scenario: Create customer with duplicate FirstName, LastName, and DateOfBirth
    Given a customer already exists with firstName "John", lastName "Doe", and dateOfBirth "2025-07-06T21:46:52.689Z"
    And I have a valid customer payload with firstName "John", lastName "Doe", and dateOfBirth "2025-07-06T21:46:52.689Z"
    When I send a POST request to "/customers"
    Then I should receive a 409 response

  # Read customer
  Scenario: Get an existing customer by ID
    Given a customer exists with ID "68b42f7e-705e-406f-ac18-08b3475dc33f"
    When I send a GET request to "/customers/68b42f7e-705e-406f-ac18-08b3475dc33f"
    Then I should receive a 200 response
    And the response body contains the customer data

  Scenario: Get a non-existent customer by ID
    When I send a GET request to "/customers/68b42f7e-705e-406f-ac18-08b3475dc33f"
    Then I should receive a 404 response

  # Update customer happy path
  Scenario: Update a customer with valid data
    Given a customer exists with ID "68b42f7e-705e-406f-ac18-08b3475dc33f"
    And I have an updated valid payload
    When I send a PATCH request to "/customers/68b42f7e-705e-406f-ac18-08b3475dc33f"
    Then I should receive a 200 response
    And the response body contains the updated customer data

  # Delete customer
  Scenario: Delete an existing customer
    Given a customer exists with ID "68b42f7e-705e-406f-ac18-08b3475dc33f"
    When I send a DELETE request to "/customers/68b42f7e-705e-406f-ac18-08b3475dc33f"
    Then I should receive a 204 response

