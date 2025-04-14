import { BadRequestException } from '@nestjs/common';
import { PhoneNumberUtil } from 'google-libphonenumber';

export class PhoneNumber {
  private readonly value: string;

  constructor(phone: string) {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const parsed = phoneUtil.parse(phone);
    if (!phoneUtil.isValidNumber(parsed)) {
      throw new BadRequestException('Invalid phone number');
    }

    this.value = phoneUtil.format(parsed, 1); // E.164
  }

  getValue(): string {
    return this.value;
  }
}
