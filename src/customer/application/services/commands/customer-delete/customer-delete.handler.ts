
export class CustomerDeleteCommand {
  constructor(
    public readonly customerId: string,
    public readonly lang: string,
  ) {}
} 