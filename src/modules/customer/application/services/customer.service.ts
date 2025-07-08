// src/modules/customer/application/services/customer.service.ts

import { ICustomerRepository } from "../interfaces/customer-repository.interface";
import { Customer } from "@/modules/customer/domain/customer.entity";

/**
 * Currently this file seems a tiny service file,
 * I keep it because of comply to clean architecture.
 * In the feature, this file can growth...
 */
export class CustomerService {
  constructor(private readonly repository: ICustomerRepository) {}

  async create(customer: Customer): Promise<void> {
    await this.repository.create(customer);
  }
}
