export class CustomerCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dateOfBirth: Date,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly bankAccountNumber: string,
  ) {}
}
