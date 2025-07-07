import { UpdateCustomerDto } from '../dtos/update-customer.dto';

export class CustomerUpdatedEvent {
  constructor(
    public readonly id: string,
    public readonly updateDto: UpdateCustomerDto,
  ) {}
}
