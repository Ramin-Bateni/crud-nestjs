import { Test, TestingModule } from '@nestjs/testing';
import { CustomerGetHandler } from './customer-get.query';
import { CustomerMongoRepository } from '../../../../domain/services/repositories';
import { CustomerGetQuery } from './customer-get.handler';
import { HttpStatus } from '@nestjs/common';
import { localization } from '@common';
import { LocalizationMessage } from '@/customer/infrastructure/localization';
import { GetCustomerMap } from '@/customer/application/map';
import { Types } from 'mongoose';
import { CustomerDocument } from '../../../../domain/models/entities';
import { I18nTestModule } from '@/common/test/i18n-test.module';
import { I18nContext } from 'nestjs-i18n';

jest.mock('@/customer/application/map', () => ({
  GetCustomerMap: {
    item: jest.fn(),
  },
}));

describe('CustomerGetHandler', () => {
  let handler: CustomerGetHandler;
  let customerMongoRepository: jest.Mocked<CustomerMongoRepository>;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [I18nTestModule],
      providers: [
        CustomerGetHandler,
        {
          provide: CustomerMongoRepository,
          useValue: {
            FindOne: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<CustomerGetHandler>(CustomerGetHandler);
    customerMongoRepository = module.get(CustomerMongoRepository);

    // Mock I18nContext
    jest.spyOn(I18nContext, 'current').mockImplementation(() => {
      const mockContext = {
        t: () => ({
          code: {
            enum: 'CUSTOMER_NOT_FOUND',
            number: 404
          },
          text: {
            developer: 'Customer not found',
            client: 'Customer not found'
          }
        }),
        lang: 'en',
        service: {} as any,
        id: 1,
        i18n: {} as any,
        translate: () => ({
          code: {
            enum: 'CUSTOMER_NOT_FOUND',
            number: 404
          },
          text: {
            developer: 'Customer not found',
            client: 'Customer not found'
          }
        }),
        validate: () => true,
      } as unknown as I18nContext<any>;
      return mockContext;
    });
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await module.close();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('execute', () => {
    const mockCustomerId = new Types.ObjectId('507f1f77bcf86cd799439011');
    const mockQuery = new CustomerGetQuery(mockCustomerId.toString(), 'en');

    it('should get a customer successfully', async () => {
      const existingCustomer = {
        _id: mockCustomerId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        bankAccountNumber: '12345678901234',
        dateOfBirth: new Date('1990-01-01'),
      } as unknown as CustomerDocument;

      const mockMappedCustomer = {
        id: mockCustomerId.toString(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        bankAccountNumber: '12345678901234',
        dateOfBirth: new Date('1990-01-01'),
      };

      customerMongoRepository.FindOne.mockResolvedValue(existingCustomer);
      (GetCustomerMap.item as jest.Mock).mockResolvedValue(mockMappedCustomer);

      const result = await handler.execute(mockQuery);

      expect(result).toEqual(mockMappedCustomer);
      expect(customerMongoRepository.FindOne).toHaveBeenCalledWith({ _id: mockCustomerId.toString() });
      expect(GetCustomerMap.item).toHaveBeenCalledWith(existingCustomer);
    });

    it('should throw error when customer not found', async () => {
      customerMongoRepository.FindOne.mockResolvedValue(null);

      await expect(handler.execute(mockQuery)).rejects.toThrow();
      await expect(handler.execute(mockQuery)).rejects.toMatchObject({
        response: {
          meta: {
            hasError: true,
            message: [{
              code: { enum: 'CUSTOMER_NOT_FOUND', number: 404 },
              text: {
                developer: 'Customer not found',
                client: 'Customer not found'
              }
            }]
          }
        },
        status: 404
      });
    });
  });
}); 