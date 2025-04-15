import { MetaInterface } from "@/common";

export interface GetCustomerUpdateInterface {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    bankAccountNumber: string;
    dateOfBirth: Date;
} 

export interface GetCustomerResponseInterface extends GetCustomerUpdateInterface {
    id: string;
}
  
export interface GetCustomerUpdateResponseInterface {
    data: GetCustomerResponseInterface | null;
    meta: MetaInterface;
}