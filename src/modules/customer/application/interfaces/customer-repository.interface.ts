// src/modules/customer/application/interfaces/customer-repository.interface.ts

import { Customer } from "@/modules/customer/domain/customer.entity";

export interface ICustomerRepository {
  create(customer: Customer): Promise<void>;
}
