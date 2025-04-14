import { CustomerDocument } from '../../domain/models/entities';
import { GetCustomerResponseInterface } from '../interfaces';

export class GetCustomerMap {
  static async item(item: CustomerDocument): Promise<GetCustomerResponseInterface> {
    return {
      id: item?.id,
      firstName: item?.firstName,
      lastName: item?.lastName,
      email: item?.email,
      phoneNumber: item?.phoneNumber, 
      bankAccountNumber: item?.bankAccountNumber,
      dateOfBirth: item?.dateOfBirth,
    };
  }
}
