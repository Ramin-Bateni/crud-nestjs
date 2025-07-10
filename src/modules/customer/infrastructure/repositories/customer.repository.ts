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
      phoneNumber: data.phoneNumber?.getValue(),
      email: data.email?.getValue(),
      bankAccountNumber: data.bankAccountNumber?.getValue(),
    };

    const created = new this.customerModel(toSave);
    // Save Customer
    await created.save();

    return new DomainCustomer(
      created.firstName,
      created.lastName,
      new Date(created.dateOfBirth),
      new PhoneNumber(created.phoneNumber),
      new Email(created.email),
      new BankAccountNumber(created.bankAccountNumber)
    );
  }
}
