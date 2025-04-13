import { PhoneNumberUtil } from 'google-libphonenumber';

export class PhoneNumber {
  private readonly value: string;

  constructor(phone: string) {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const parsed = phoneUtil.parseAndKeepRawInput(phone, 'US');
    if (!phoneUtil.isValidNumberForRegion(parsed, 'US')) {
      throw new Error('Invalid phone number');
    }

    this.value = phoneUtil.format(parsed, 1); // E.164
  }

  getValue(): string {
    return this.value;
  }
}
