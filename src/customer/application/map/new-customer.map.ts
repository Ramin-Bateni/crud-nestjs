import { CustomerDocument } from '../../domain/models/entities';
import { NewCustomerCreateInterface } from '../interfaces';

export class NewCustomerMap {
  static async item(item: CustomerDocument): Promise<NewCustomerCreateInterface> {
    return {
      id: item?._id?.toString() || '',
      firstName: item?.firstName,
      lastName: item?.lastName,
      email: item?.email,
      phoneNumber: item?.phoneNumber, 
      bankAccountNumber: item?.bankAccountNumber,
      dateOfBirth: item?.dateOfBirth,
    };
  }
}
