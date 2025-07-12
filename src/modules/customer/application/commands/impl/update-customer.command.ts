export class UpdateCustomerCommand {
  constructor(public readonly email: string, public readonly partial: any) {}
}
