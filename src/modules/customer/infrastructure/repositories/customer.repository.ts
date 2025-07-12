import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer as DomainCustomer } from "../../domain/customer.entity";
import { Customer, CustomerDocument } from "./schemas/customer.schema";
import { BankAccountNumber } from "../../domain/value-objects/bank-account-number.vo";
import { Email } from "../../domain/value-objects/email.vo";
import { PhoneNumber } from "../../domain/value-objects/phone-number.vo";

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>
  ) {}

  /**
   * Fetch all customers from the database.
   * @returns A promise that resolves to an array of DomainCustomer.
   */
  async findAll(): Promise<DomainCustomer[]> {
    const docs = await this.customerModel.find().lean().exec();
    return docs.map(
      (d) =>
        new DomainCustomer(
          d.firstName,
          d.lastName,
          new Date(d.dateOfBirth),
          new PhoneNumber(d.phoneNumber),
          new Email(d.email),
          new BankAccountNumber(d.bankAccountNumber)
        )
    );
  }

  /**
   * Create and save a new customer document.
   * @param data Domain customer data to create.
   * @returns The saved customer as DomainCustomer.
   */
  async create(data: DomainCustomer): Promise<DomainCustomer> {
    const toSave = {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      phoneNumber: data.phoneNumber.getValue(),
      email: data.email.getValue(),
      bankAccountNumber: data.bankAccountNumber.getValue(),
    };

    const created = new this.customerModel(toSave);
    // Save Customer
    await created.save();

    return this.customerToDomainCustomer(created);
  }

  /**
   * Find a customer by email
   */
  async findByEmail(email: string): Promise<DomainCustomer | null> {
    const customer = await this.customerModel.findOne({ email }).lean();

    if (!customer) {
      return null;
    }

    return this.customerToDomainCustomer(customer);
  }

  /**
   * Update info of a customer by email
   * @param email customer email
   * @param partial customer info
   * @returns
   */
  async updateByEmail(
    email: string,
    partial: Partial<DomainCustomer>
  ): Promise<DomainCustomer | null> {
    const { modifiedCount } = await this.customerModel.updateOne(
      { email },
      { $set: partial }
    );

    if (modifiedCount === 0) return null;

    const customerDoc = await this.customerModel.findOne({ email });

    if (!customerDoc) return null;

    return this.customerToDomainCustomer(customerDoc!.toObject());
  }

  /**
   * Delete a customer by email
   * @param email email of customer who want to delete
   * @returns
   */
  async deleteByEmail(email: string): Promise<boolean> {
    const { deletedCount } = await this.customerModel.deleteOne({ email });

    return deletedCount === 1;
  }

  customerToDomainCustomer(customer: Customer): DomainCustomer {
    return new DomainCustomer(
      customer.firstName,
      customer.lastName,
      new Date(customer.dateOfBirth),
      new PhoneNumber(customer.phoneNumber),
      new Email(customer.email),
      new BankAccountNumber(customer.bankAccountNumber)
    );
  }
}
