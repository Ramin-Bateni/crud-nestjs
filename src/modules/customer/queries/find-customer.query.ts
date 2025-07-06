import { FindCustomerDto } from '../dtos/find-customer.dto';

export class FindCustomerQuery {
  constructor(public readonly dto: FindCustomerDto) {}
}
