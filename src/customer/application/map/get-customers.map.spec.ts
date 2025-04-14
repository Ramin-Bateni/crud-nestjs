import { GetCustomersMap } from './get-customers.map';
import { CustomerDocument } from '../../domain/models/entities';
import { Types } from 'mongoose';

describe('GetCustomersMap', () => {
  describe('items', () => {
    it('should map customer documents to response interface array', async () => {
      const mockCustomers = [
        {
          _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber: '1234567890',
          bankAccountNumber: '12345678901234',
          dateOfBirth: new Date('1990-01-01'),
        },
        {
          _id: new Types.ObjectId('507f1f77bcf86cd799439012'),
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@example.com',
          phoneNumber: '0987654321',
          bankAccountNumber: '98765432109876',
          dateOfBirth: new Date('1992-01-01'),
        },
      ] as unknown as CustomerDocument[];

      const result = await GetCustomersMap.items(mockCustomers);

      expect(result).toEqual([
        {
          id: '507f1f77bcf86cd799439011',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber: '1234567890',
          bankAccountNumber: '12345678901234',
          dateOfBirth: new Date('1990-01-01'),
        },
        {
          id: '507f1f77bcf86cd799439012',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@example.com',
          phoneNumber: '0987654321',
          bankAccountNumber: '98765432109876',
          dateOfBirth: new Date('1992-01-01'),
        },
      ]);
    });

    it('should handle empty array', async () => {
      const mockCustomers: CustomerDocument[] = [];

      const result = await GetCustomersMap.items(mockCustomers);

      expect(result).toEqual([]);
    });

    it('should handle null values', async () => {
      const mockCustomers = [
        {
          _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          bankAccountNumber: '',
          dateOfBirth: new Date(),
        },
      ] as unknown as CustomerDocument[];

      const result = await GetCustomersMap.items(mockCustomers);

      // Compare dates using toISOString() to avoid millisecond differences
      expect(result[0].dateOfBirth.toISOString()).toBe(mockCustomers[0].dateOfBirth.toISOString());
      expect({
        ...result[0],
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