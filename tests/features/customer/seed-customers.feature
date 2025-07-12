Feature: Seed DB

  Scenario Outline: Seed DB and fill global references (seed, firstCustomer, customerModel)
    Given the following customers already exists
      | FirstName | LastName  | DateOfBirth| PhoneNumber    | Email                     | BankAccountNumber           |
      | Alexander | Hamilton  | 1982-01-01 | +447911123456  | alex.hamilton@example.com | GB82WEST12345698765432      |
      | John      | Doe       | 1990-05-15 | +4915112345678 | john.doe@example.com      | DE89370400440532013000      |
      | Maria     | Silva     | 1985-07-20 | +5511998765432 | maria.silva@example.com   | BR1500000000000010932840814 |
      | Pierre    | Dupont    | 1970-02-14 | +33612345678   | pierre.dupont@example.fr  | FR7630006000011234567890189 |
      # | Sofía     | García    | 1988-03-30 | +34612345678   | sofia.garcia@example.es   | ES9121000418450200051332    |
      # | Mario     | Rossi     | 1995-06-18 | +393491234567  | mario.rossi@example.it    | IT60X0542811101000000123456 |
      # | Anna      | Jansen    | 1983-09-25 | +31612345678   | anna.jansen@example.nl    | NL91ABNA0417164300          |
    Then go to next scenarios