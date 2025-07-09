// src/modules/customer/application/services/customer.service.ts

import { Inject, Injectable } from "@nestjs/common";
import {
  I_CUSTOMER_REPOSITORY,
  ICustomerRepository,
} from "../interfaces/customer-repository.interface";
import { Customer } from "@/modules/customer/domain/customer.entity";

/**
 * Currently this file seems a tiny service file,
 * I keep it because of comply to clean architecture.
 * In the feature, this file can growth...
 */
@Injectable()
export class CustomerService {
  constructor(
    @Inject(I_CUSTOMER_REPOSITORY)
    private readonly repository: ICustomerRepository
  ) {}

  async create(customer: Customer): Promise<void> {
    await this.repository.create(customer);
  }
}
