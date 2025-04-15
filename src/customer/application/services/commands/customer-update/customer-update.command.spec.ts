import { Test, TestingModule } from '@nestjs/testing';
import { CustomerUpdateHandler } from './customer-update.command';
import { CustomerMongoRepository } from '../../../../domain/services/repositories';
import { CustomerValidator } from '@/common/validators/customer.validator';
import { CustomerUpdateCommand } from './customer-update.handler';
import { HttpStatus } from '@nestjs/common';
import { localization } from '@common';
import { LocalizationMessage } from '@/customer/infrastructure/localization';
import { Types } from 'mongoose';
import { CustomerDocument } from '../../../../domain/models/entities';
import { I18nTestModule } from '@/common/test/i18n-test.module';
import { GetCustomerUpdateInterface } from '@/customer/application/interfaces';

describe('CustomerUpdateHandler', () => {
  let handler: CustomerUpdateHandler;
  let customerMongoRepository: jest.Mocked<CustomerMongoRepository>;
  let validator: jest.Mocked<CustomerValidator>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [I18nTestModule],
      providers: [
        CustomerUpdateHandler,
        {
          provide: CustomerMongoRepository,
          useValue: {
            FindOne: jest.fn(),
            UpdateById: jest.fn(),
            IsExist: jest.fn(),
          },
        },
        {
          provide: CustomerValidator,
          useValue: {
            validateDateOfBirth: jest.fn(),
            validateCustomerData: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<CustomerUpdateHandler>(CustomerUpdateHandler);
    customerMongoRepository = module.get(CustomerMongoRepository);
    validator = module.get(CustomerValidator);

    // Mock localization.message
    jest.spyOn(localization, 'message').mockImplementation((key: string, options: any, isError: boolean, status: number) => ({
      serverTime: new Date(),
      hasError: isError,
      message: [{
        code: { enum: key, number: 0 },
        text: { developer: key, client: key }
      }]
    }));
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('execute', () => {
    const mockCustomerId = new Types.ObjectId('507f1f77bcf86cd799439011');
    const mockUpdateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      bankAccountNumber: '12345678901234',
      dateOfBirth: new Date('1990-01-01'),
    };
    const mockCommand = new CustomerUpdateCommand(mockCustomerId.toString(), mockUpdateData, 'en');

    it('should update a customer successfully', async () => {
      const existingCustomer = {
        _id: mockCustomerId,
        firstName: 'Old',
        lastName: 'Name',
        email: 'old.email@example.com',
        phoneNumber: '0987654321',
        bankAccountNumber: '98765432109876',
        dateOfBirth: new Date('1980-01-01'),
      } as unknown as CustomerDocument;

      customerMongoRepository.FindOne.mockResolvedValue(existingCustomer);
      customerMongoRepository.IsExist.mockResolvedValue(false);
      validator.validateDateOfBirth.mockReturnValue(mockUpdateData.dateOfBirth);
      validator.validateCustomerData.mockImplementation(() => {});
      customerMongoRepository.UpdateById.mockResolvedValue({
        ...existingCustomer,
        ...mockUpdateData,
      } as unknown as CustomerDocument);

      const result = await handler.execute(mockCommand);

      expect(result).toBeDefined();
      expect(customerMongoRepository.FindOne).toHaveBeenCalledWith({ _id: mockCustomerId.toString() });
      expect(customerMongoRepository.UpdateById).toHaveBeenCalledWith(mockCustomerId.toString(), mockUpdateData);
    });

    it('should throw error when customer not found', async () => {
      customerMongoRepository.FindOne.mockResolvedValue(null);

      await expect(handler.execute(mockCommand)).rejects.toEqual({
        hasError: true,
        message: [{
          code: { enum: LocalizationMessage.CUSTOMER_NOT_FOUND, number: 0 },
          text: { developer: LocalizationMessage.CUSTOMER_NOT_FOUND, client: LocalizationMessage.CUSTOMER_NOT_FOUND }
        }],
        serverTime: expect.any(Date)
      });
    });

    it('should throw error when email already exists', async () => {
      const existingCustomer = {
        _id: mockCustomerId,
        firstName: 'Old',
        lastName: 'Name',
        email: 'old.email@example.com',
        phoneNumber: '0987654321',
        bankAccountNumber: '98765432109876',
        dateOfBirth: new Date('1980-01-01'),
      } as unknown as CustomerDocument;

      customerMongoRepository.FindOne.mockResolvedValue(existingCustomer);
      customerMongoRepository.IsExist.mockResolvedValue(true);

      await expect(handler.execute(mockCommand)).rejects.toEqual({
        hasError: true,
        message: [{
          code: { enum: LocalizationMessage.CUSTOMER_EMAIL_ALREADY_EXISTS, number: 0 },
          text: { developer: LocalizationMessage.CUSTOMER_EMAIL_ALREADY_EXISTS, client: LocalizationMessage.CUSTOMER_EMAIL_ALREADY_EXISTS }
        }],
        serverTime: expect.any(Date)
      });
    });

    it('should throw error when no update data provided', async () => {
      const existingCustomer = {
        _id: mockCustomerId,
        firstName: 'Old',
        lastName: 'Name',
        email: 'old.email@example.com',
        phoneNumber: '0987654321',
        bankAccountNumber: '98765432109876',
        dateOfBirth: new Date('1980-01-01'),
      } as unknown as CustomerDocument;

      customerMongoRepository.FindOne.mockResolvedValue(existingCustomer);
      const emptyUpdateCommand = new CustomerUpdateCommand(mockCustomerId.toString(), {} as GetCustomerUpdateInterface, 'en');

      await expect(handler.execute(emptyUpdateCommand)).rejects.toEqual({
        hasError: true,
        message: [{
          code: { enum: LocalizationMessage.NO_UPDATE_DATA_PROVIDED, number: 0 },
          text: { developer: LocalizationMessage.NO_UPDATE_DATA_PROVIDED, client: LocalizationMessage.NO_UPDATE_DATA_PROVIDED }
        }],
        serverTime: expect.any(Date)
      });
    });
  });
}); 