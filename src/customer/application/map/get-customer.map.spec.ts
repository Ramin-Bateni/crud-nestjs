import { GetCustomerMap } from './get-customer.map';
import { CustomerDocument } from '../../domain/models/entities';
import { Types } from 'mongoose';

describe('GetCustomerMap', () => {
  describe('item', () => {
    it('should map customer document to response interface', async () => {
      const mockCustomer = {
        _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        bankAccountNumber: '12345678901234',
        dateOfBirth: new Date('1990-01-01'),
      } as unknown as CustomerDocument;

      const result = await GetCustomerMap.item(mockCustomer);

      expect(result).toEqual({
        id: '507f1f77bcf86cd799439011',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        bankAccountNumber: '12345678901234',
        dateOfBirth: new Date('1990-01-01'),
      });
    });

    it('should handle null values', async () => {
      const mockCustomer = {
        _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        bankAccountNumber: '',
        dateOfBirth: new Date(),
      } as unknown as CustomerDocument;

      const result = await GetCustomerMap.item(mockCustomer);

      // Compare dates using toISOString() to avoid millisecond differences
      expect(result.dateOfBirth.toISOString()).toBe(mockCustomer.dateOfBirth.toISOString());
      expect({
        ...result,
        dateOfBirth: undefined,
      }).toEqual({
        id: '507f1f77bcf86cd799439011',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        bankAccountNumber: '',
        dateOfBirth: undefined,
      });
    });
  });
}); 