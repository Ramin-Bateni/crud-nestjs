import { Customer } from 'src/domain/entities/customer.entity';

export class CustomerCreatedEvent {
  constructor(public readonly customer: Customer) {}
}
