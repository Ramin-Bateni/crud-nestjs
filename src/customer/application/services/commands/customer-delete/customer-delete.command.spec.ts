import { Test, TestingModule } from '@nestjs/testing';
import { CustomerDeleteHandler } from './customer-delete.command';
import { CustomerMongoRepository } from '../../../../domain/services/repositories';
import { CustomerDeleteCommand } from './customer-delete.handler';
import { HttpStatus, HttpException } from '@nestjs/common';
import { localization } from '@common';
import { LocalizationMessage } from '@/customer/infrastructure/localization';
import { Types } from 'mongoose';
import { CustomerDocument } from '../../../../domain/models/entities';
import { I18nTestModule } from '@/common/test/i18n-test.module';
import { I18nContext } from 'nestjs-i18n';

jest.mock('nestjs-i18n', () => ({
  I18nModule: {
    forRoot: () => ({
      module: class I18nModule {},
      providers: [],
      exports: [],
    }),
  },
  I18nContext: {
    current: () => ({
      t: (key: string) => key,
      translate: (key: string) => ({
        code: {
          enum: key,
          number: 0,
        },
        text: {
          developer: key,
          client: key,
        },
      }),
    }),
  },
  HeaderResolver: jest.fn().mockImplementation(() => ({
    resolve: jest.fn(),
  })),
}));

describe('CustomerDeleteHandler', () => {
  let handler: CustomerDeleteHandler;
  let customerMongoRepository: jest.Mocked<CustomerMongoRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [I18nTestModule],
      providers: [
        CustomerDeleteHandler,
        {
          provide: CustomerMongoRepository,
          useValue: {
            FindOne: jest.fn(),
            DestroyById: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<CustomerDeleteHandler>(CustomerDeleteHandler);
    customerMongoRepository = module.get(CustomerMongoRepository);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('execute', () => {
    const mockCustomerId = new Types.ObjectId('507f1f77bcf86cd799439011');
    const mockCommand = new CustomerDeleteCommand(mockCustomerId.toString(), 'en');

    it('should delete a customer successfully', async () => {
      const existingCustomer = {
        _id: mockCustomerId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        bankAccountNumber: '12345678901234',
        dateOfBirth: new Date('1990-01-01'),
      } as unknown as CustomerDocument;

      customerMongoRepository.FindOne.mockResolvedValue(existingCustomer);
      customerMongoRepository.DestroyById.mockResolvedValue(existingCustomer);

      const result = await handler.execute(mockCommand);

      expect(result).toBe(true);
      expect(customerMongoRepository.FindOne).toHaveBeenCalledWith({ _id: mockCustomerId.toString() });
      expect(customerMongoRepository.DestroyById).toHaveBeenCalledWith(mockCustomerId.toString());
    });

    it('should throw error when customer not found', async () => {
      customerMongoRepository.FindOne.mockResolvedValue(null);

      await expect(handler.execute(mockCommand)).rejects.toThrow(HttpException);
      await expect(handler.execute(mockCommand)).rejects.toMatchObject({
        response: {
          meta: {
            hasError: true,
            message: [
              {
                code: {
                  enum: 'customer.CUSTOMER_NOT_FOUND',
                  number: 0,
                },
                text: {
                  developer: 'customer.CUSTOMER_NOT_FOUND',
                  client: 'customer.CUSTOMER_NOT_FOUND',
                },
              },
            ],
          },
        },
        status: HttpStatus.NOT_FOUND,
      });
    });
  });
}); 