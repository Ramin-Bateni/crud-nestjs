import { Test, TestingModule } from '@nestjs/testing';
import { CustomerCreateHandler } from './customer-create.command';
import { CustomerMongoRepository } from '../../../../domain/services/repositories';
import { CustomerMongoFactory } from '../../../../domain/services/factories';
import { CustomerValidator } from '@/common/validators/customer.validator';
import { CustomerCreateCommand } from './customer-create.handler';
import { HttpStatus, HttpException } from '@nestjs/common';
import { localization } from '@common';
import { LocalizationMessage } from '@/customer/infrastructure/localization';
import { Types } from 'mongoose';
import { CustomerDocument } from '../../../../domain/models/entities';
import { I18nTestModule } from '@/common/test/i18n-test.module';
import { I18nContext } from 'nestjs-i18n';

describe('CustomerCreateHandler', () => {
  let handler: CustomerCreateHandler;
  let customerMongoRepository: jest.Mocked<CustomerMongoRepository>;
  let customerMongoFactory: jest.Mocked<CustomerMongoFactory>;
  let validator: jest.Mocked<CustomerValidator>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [I18nTestModule],
      providers: [
        CustomerCreateHandler,
        {
          provide: CustomerMongoRepository,
          useValue: {
            IsExist: jest.fn(),
          },
        },
        {
          provide: CustomerMongoFactory,
          useValue: {
            Create: jest.fn(),
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

    handler = module.get<CustomerCreateHandler>(CustomerCreateHandler);
    customerMongoRepository = module.get(CustomerMongoRepository);
    customerMongoFactory = module.get(CustomerMongoFactory);
    validator = module.get(CustomerValidator);

    // Mock I18nContext
    jest.spyOn(I18nContext, 'current').mockImplementation(() => ({
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
    } as any));
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('execute', () => {
    const mockCustomer = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      bankAccountNumber: '12345678901234',
      dateOfBirth: new Date('1990-01-01'),
    };

    const mockCommand = new CustomerCreateCommand(mockCustomer, 'en');

    it('should create a customer successfully', async () => {
      customerMongoRepository.IsExist.mockResolvedValue(false);
      validator.validateDateOfBirth.mockReturnValue(mockCustomer.dateOfBirth);
      validator.validateCustomerData.mockImplementation(() => {});
      customerMongoFactory.Create.mockResolvedValue({
        _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
        ...mockCustomer,
      } as unknown as CustomerDocument);

      const result = await handler.execute(mockCommand);

      expect(result).toBeDefined();
      expect(customerMongoRepository.IsExist).toHaveBeenCalledTimes(2);
      expect(customerMongoFactory.Create).toHaveBeenCalledWith(mockCustomer);
    });

    it('should throw error when email already exists', async () => {
      customerMongoRepository.IsExist.mockResolvedValue(true);
      validator.validateDateOfBirth.mockReturnValue(mockCustomer.dateOfBirth);
      validator.validateCustomerData.mockImplementation(() => {});

      await expect(handler.execute(mockCommand)).rejects.toThrow(HttpException);
      await expect(handler.execute(mockCommand)).rejects.toMatchObject({
        response: {
          meta: {
            hasError: true,
            message: expect.arrayContaining([
              expect.objectContaining({
                code: expect.any(Object),
                text: expect.any(Object)
              })
            ])
          }
        },
        status: HttpStatus.BAD_REQUEST
      });
    });

    it('should throw error when customer already exists', async () => {
      customerMongoRepository.IsExist
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(true);
      validator.validateDateOfBirth.mockReturnValue(mockCustomer.dateOfBirth);
      validator.validateCustomerData.mockImplementation(() => {});

      await expect(handler.execute(mockCommand)).rejects.toMatchObject({
        response: {
          meta: {
            hasError: true,
            message: expect.arrayContaining([
              expect.objectContaining({
                code: expect.any(Object),
                text: expect.any(Object)
              })
            ])
          }
        },
        status: HttpStatus.BAD_REQUEST
      });
    });
  });
}); 