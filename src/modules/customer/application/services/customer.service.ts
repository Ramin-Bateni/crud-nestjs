import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "../../infrastructure/repositories/customer.repository";
import { Customer as DomainCustomer } from "../../domain/customer.entity";

@Injectable()
export class CustomerService {
  constructor(private readonly repo: CustomerRepository) {}

  /**
   * Get all customers
   * @returns
   */
  async findAll(): Promise<DomainCustomer[]> {
    return await this.repo.findAll();
  }

  /**
   * Create a new customer
   * @param data customer data
   * @returns save customer data
   */
  async create(data: DomainCustomer): Promise<DomainCustomer> {
    return await this.repo.create(data);
  }
}
