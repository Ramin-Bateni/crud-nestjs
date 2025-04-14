export class CustomerGetQuery {
  constructor(
    public readonly customerId: string,
    public readonly lang: string,
  ) {}
} 