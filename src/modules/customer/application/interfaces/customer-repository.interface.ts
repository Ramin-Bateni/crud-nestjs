// src/modules/customer/application/interfaces/customer-repository.interface.ts

import { Customer } from "@/modules/customer/domain/customer.entity";

export const I_CUSTOMER_REPOSITORY = Symbol("ICustomerRepository");

export interface ICustomerRepository {
  create(customer: Customer): Promise<void>;
}
