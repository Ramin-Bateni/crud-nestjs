import { Injectable } from '@nestjs/common';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

@Injectable()
export class PhoneValidator {
  /**
   * Validates a phone number according to E.164 standard
   * @param phone Raw input (e.g., "+1 (650) 555-1234")
   * @returns Validation result with normalized number
   */
  validate(phone: string): {
    isValid: boolean;
    normalizedNumber?: string;
    error?: string;
  } {
    try {
      const phoneNumber = parsePhoneNumberFromString(phone);
      
      if (!phoneNumber) {
        return { 
          isValid: false, 
          error: 'Invalid phone number format' 
        };
      }

      if (!phoneNumber.isValid()) {
        return {
          isValid: false,
          error: `Invalid phone number for region: ${phoneNumber.country}`
        };
      }

      return {
        isValid: true,
        normalizedNumber: phoneNumber.format('E.164') // +16505551234
      };
    } catch (error) {
      return {
        isValid: false,
        error: 'Phone number parsing failed'
      };
    }
  }

  normalize(phone: string): string {
    const result = this.validate(phone);
    if (!result.isValid) {
      throw new Error(`Phone validation failed: ${result.error}`);
    }
    return result.normalizedNumber!;
  }
}