import { Injectable, BadRequestException } from '@nestjs/common';
import { PhoneNumberUtil, PhoneNumberType } from 'google-libphonenumber';
import { isEmail } from 'class-validator';
import * as IBAN from 'ibantools';

@Injectable()
export class CustomerValidator {
  private phoneUtil = PhoneNumberUtil.getInstance();

  validatePhoneNumber(phoneNumber: string): boolean {
    try {
      const number = this.phoneUtil.parse(phoneNumber);
      return this.phoneUtil.isValidNumber(number) && 
             this.phoneUtil.getNumberType(number) === PhoneNumberType.MOBILE;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  validateEmail(email: string): boolean {
    return isEmail(email);
  }

  validateBankAccount(bankAccountNumber: string): boolean {
    return IBAN.isValidIBAN(bankAccountNumber);
  }

  validateDateOfBirth(dateOfBirth: string | Date): Date {
    if (dateOfBirth instanceof Date) {
      return dateOfBirth;
    }
    
    // Check if it's a valid ISO date string (YYYY-MM-DD)
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoDateRegex.test(dateOfBirth)) {
      throw new BadRequestException('Date of birth must be in YYYY-MM-DD format');
    }

    const date = new Date(dateOfBirth);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date of birth');
    }

    // Validate the date is not in the future
    const today = new Date();
    if (date > today) {
      throw new BadRequestException('Date of birth cannot be in the future');
    }

    return date;
  }

  validateCustomerData(data: { 
    phoneNumber?: string; 
    email: string; 
    bankAccountNumber: string;
    dateOfBirth: string | Date;
  }): void {
    if (data.phoneNumber && !this.validatePhoneNumber(data.phoneNumber)) {
      throw new BadRequestException('Invalid mobile phone number');
    }

    if (!this.validateEmail(data.email)) {
      throw new BadRequestException('Invalid email address');
    }

    if (!this.validateBankAccount(data.bankAccountNumber)) {
      throw new BadRequestException('Invalid bank account number');
    }

    this.validateDateOfBirth(data.dateOfBirth);
  }
} 