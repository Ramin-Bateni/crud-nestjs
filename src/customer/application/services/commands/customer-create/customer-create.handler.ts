import { CustomerCreateInterface } from '../../../interfaces';

export class CustomerCreateCommand {
  constructor(
    public readonly customer: CustomerCreateInterface,
    public readonly lang: string,
  ) {}
}
