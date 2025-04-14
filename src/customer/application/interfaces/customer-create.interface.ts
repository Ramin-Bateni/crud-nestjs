import { MetaInterface } from "@/common";

export interface CustomerCreateInterface {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    bankAccountNumber: string;
    dateOfBirth: Date;
}

export interface NewCustomerCreateInterface extends CustomerCreateInterface {
    id: string;
}
  
export interface NewCustomerCreateResponseInterface {
    data: NewCustomerCreateInterface | null;
    meta: MetaInterface;
}
  