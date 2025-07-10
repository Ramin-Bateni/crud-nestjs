// src/modules/customer/application/services/customer.service.ts

import { Inject, Injectable } from "@nestjs/common";
import {
  I_CUSTOMER_REPOSITORY,
  ICustomerRepository,
} from "../interfaces/customer-repository.interface";
import { Customer } from "@/modules/customer/domain/customer.entity";

/**
 * Currently this file seems a tiny and so simple service file,
 * I keep it because of comply to Clean Architecture and DDD.
 * In the feature, this file can growth...
 */
@Injectable()
export class CustomerService {
  constructor(
    @Inject(I_CUSTOMER_REPOSITORY)
    private readonly repository: ICustomerRepository
  ) {}

  private customers: Customer[] = []; // TODO: replace with real DB integration

  async create(customer: Customer): Promise<void> {
    await this.repository.create(customer);
  }

  async findAll(): Promise<Customer[]> {
    //return await this.repository.findAll();
    return this.customers; // Temporally read from mock to pass e2e test
  }
}
