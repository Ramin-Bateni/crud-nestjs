import { CreateCustomerDto } from 'src/application/dto/create-customer.dto';

export class CreateCustomerCommand {
  constructor(public readonly customerDto: CreateCustomerDto) {}
}
