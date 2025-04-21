import { UpdateCustomerDto } from 'src/application/dto/update-customer.dto';

export class UpdateCustomerCommand {
  constructor(
    public readonly id: string,
    public readonly customerDto: UpdateCustomerDto,
  ) {}
}
