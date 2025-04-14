import { UpdateCustomerDto } from '../dto/update-customer.dto';

export class UpdateCustomerCommand {
  constructor(public readonly dto: UpdateCustomerDto) {}
}
