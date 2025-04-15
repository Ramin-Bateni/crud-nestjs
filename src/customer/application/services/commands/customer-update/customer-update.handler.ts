import { GetCustomerUpdateInterface } from '../../../interfaces';

export class CustomerUpdateCommand {
  constructor(
    public readonly customerId: string,
    public readonly customer: GetCustomerUpdateInterface,
    public readonly lang: string,
  ) {}
} 