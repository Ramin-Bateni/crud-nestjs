import { IsOptional, IsString, IsPhoneNumber, IsEmail, IsIBAN } from "class-validator";

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

  export class UpdateCustomerDto {
    @IsOptional()
    @IsString()
    firstName?: string;
  
    @IsOptional()
    @IsString()
    lastName?: string;
  
    @IsOptional()
    @IsPhoneNumber()
    phone?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsIBAN()
    bankAccountNumber?: string;
  }