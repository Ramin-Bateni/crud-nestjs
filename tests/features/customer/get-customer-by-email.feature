Feature: Customer Queries

  Background:
    Given the following customers already exists
      | FirstName | LastName  | DateOfBirth| PhoneNumber    | Email                     | BankAccountNumber           |
      | Alexander | Hamilton  | 1982-01-01 | +447911123456  | alex.hamilton@example.com | GB82WEST12345698765432      |
      | John      | Doe       | 1990-05-15 | +4915112345678 | john.doe@example.com      | DE89370400440532013000      |
      | Maria     | Silva     | 1985-07-20 | +5511998765432 | maria.silva@example.com   | BR1500000000000010932840814 |
      | Pierre    | Dupont    | 1970-02-14 | +33612345678   | pierre.dupont@example.fr  | FR7630006000011234567890189 |

  Scenario Outline: Fetch a customer by email
    When I send a GetCustomerByEmailQuery by first exist record email
    Then I should receive the customer info
