import { CustomerDocument } from '../../domain/models/entities';
import { GetCustomerResponseInterface } from '../interfaces';

export class GetCustomersMap {
  static async items(items: CustomerDocument[]): Promise<GetCustomerResponseInterface[]> {
    return items.map((item) => ({
      id: item?.id,
      firstName: item?.firstName,
      lastName: item?.lastName,
      email: item?.email,
      phoneNumber: item?.phoneNumber, 
      bankAccountNumber: item?.bankAccountNumber,
      dateOfBirth: item?.dateOfBirth,
    }));
  }
}
