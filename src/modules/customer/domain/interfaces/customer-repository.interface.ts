// src/modules/customer/application/interfaces/customer-repository.interface.ts

import { Customer as DomainCustomer } from "@/modules/customer/domain/customer.entity";

export const I_CUSTOMER_REPOSITORY = Symbol("ICustomerRepository");

/**
 * For better performance, I can split this interface to two interface:
 *  -- ICustomerWriteRepository defined --in--> Domain layer      --> It returns Domain objects
 *  -- ICustomerReadRepository defined  --in--> Application layer --> It returns DTO object
 *
 * But in this case, to simplify I keep all of the CRUD items here in Domain
 */
export interface ICustomerRepository {
  /**
   * Create a new Customer
   * @param customer
   */
  create(customer: DomainCustomer): Promise<DomainCustomer>;

  /**
   * Get all customers
   */
  findAll(): Promise<DomainCustomer[]>;

  findByEmail(email: string): Promise<DomainCustomer | null>;

  /** Update by unique email, return updated entity or null if not found */
  updateByEmail(
    email: string,
    partial: Partial<DomainCustomer>
  ): Promise<DomainCustomer | null>;

  /** Delete by unique email, return true if deleted */
  deleteByEmail(email: string): Promise<boolean>;
}
