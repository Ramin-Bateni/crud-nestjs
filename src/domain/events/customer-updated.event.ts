import { Customer } from 'src/domain/entities/customer.entity';

export class CustomerUpdatedEvent {
  constructor(
    public readonly id: string,
    public readonly customer: Partial<Customer>,
  ) {}
}
