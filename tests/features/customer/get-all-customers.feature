Feature: Customer Queries

  Scenario Outline: Fetch all customers
    Given the following customers exist:
      | FirstName  | LastName | DateOfBirth  | PhoneNumber     | Email                      | BankAccountNumber           |
    When I send a GetAllCustomersQuery
    Then I should receive a list of all customers

  Examples:
    | FirstName  | LastName | DateOfBirth | PhoneNumber       | Email                      | BankAccountNumber           |
    | Alexander  | Hamilton | 1982-01-01  | +447911123456     | alex.hamilton@example.com  | GB82WEST12345698765432      |
    | John       | Doe      | 1990-05-15  | +14155552671      | john.doe@example.com       | US64SVBKUS6S3300958879      |
    | Maria      | Silva    | 1985-07-20  | +5511998765432    | maria.silva@example.com    | BR1500000000000010932840814 |
