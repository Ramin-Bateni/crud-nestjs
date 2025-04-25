export type CreateCustomerDto = {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
    bankAccountNumber: string;
}

export class CustomerResponseDto {
    readonly id: string;
    readonly fullName: string;
    readonly dateOfBirth: string;
    readonly phone: string;
    readonly email: string;
    readonly bankAccountNumber: string;
  }