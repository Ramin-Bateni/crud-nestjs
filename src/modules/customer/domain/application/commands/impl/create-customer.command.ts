// src/modules/customer/application/commands/impl/create-customer.command.ts

export class CreateCustomerCommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dateOfBirth: Date,
    public readonly phoneNumber: string,
    public readonly email: string,
    public readonly bankAccountNumber: string
  ) {}
}
