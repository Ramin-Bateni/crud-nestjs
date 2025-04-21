export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  bankAccountNumber: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCustomerDto {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  bankAccountNumber: string;
}

export interface UpdateCustomerDto {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  email?: string;
  bankAccountNumber?: string;
}

export interface CustomerApiError {
  statusCode: number;
  message: string;
  error?: string;
}