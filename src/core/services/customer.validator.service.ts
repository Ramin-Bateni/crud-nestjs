import { Inject, Injectable } from "@nestjs/common";
import { Customer } from "../domain/customer.entity";
import { ICustomerRepository } from "../repositories/customer.repository.interface";
import { PhoneValidator } from "../../infrastructure/validation/phone.validator";

@Injectable()
export class CustomerValidator {
  constructor(
    @Inject('ICustomerRepository') private repository: ICustomerRepository,
    private phoneValidator: PhoneValidator
  ) {}

  async validate(customer: Customer): Promise<void> {
    // 1. Check email uniqueness
    const existingEmail = await this.repository.findByEmail(customer.email);
    if (existingEmail && existingEmail?.id !== customer.id) {
      throw new Error('Email already exists');
    }

    // 2. Validate phone number
    if (!this.phoneValidator.validate(customer.phone)) {
      throw new Error('Invalid phone number');
    }

    // 3. Check composite uniqueness (Firstname+Lastname+DOB)
    const exists = await this.repository.existsByUniqueFields(
      customer.firstName,
      customer.lastName,
      customer.dateOfBirth
    );
    if (exists) throw new Error('Customer already exists');
  }
}