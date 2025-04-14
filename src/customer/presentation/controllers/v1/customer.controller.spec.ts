import { Test, TestingModule } from '@nestjs/testing';
import { V1CustomerController } from './customer.controller';
import { CustomerUseCase } from '../../../application/use-cases/customer.use-case';
import { CustomerCreateDto } from '../../dto/create-customer.dto';
import { GetCustomerUpdateRequestDto } from '../../dto/update-customer.dto';
import { PageSizePaginationDto } from '@/common/pagination';
import { GetLanguageDto, LanguageListEnum } from '@/common';
import { I18nTestModule } from '@/common/test/i18n-test.module';

describe('V1CustomerController', () => {
  let controller: V1CustomerController;
  let customerUseCase: jest.Mocked<CustomerUseCase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [I18nTestModule],
      controllers: [V1CustomerController],
      providers: [
        {
          provide: CustomerUseCase,
          useValue: {
            CustomerCreate: jest.fn(),
            CustomerUpdate: jest.fn(),
            CustomerDelete: jest.fn(),
            CustomerGet: jest.fn(),
            CustomerList: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<V1CustomerController>(V1CustomerController);
    customerUseCase = module.get(CustomerUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('CustomerCreate', () => {
    it('should create a customer successfully', async () => {
      const mockCreateDto = new CustomerCreateDto();
      mockCreateDto.firstName = 'John';
      mockCreateDto.lastName = 'Doe';
      mockCreateDto.email = 'john.doe@example.com';
      mockCreateDto.phoneNumber = '1234567890';
      mockCreateDto.bankAccountNumber = '12345678901234';
      mockCreateDto.dateOfBirth = new Date('1990-01-01');

      const mockResponse = {
        data: {
          id: '67fd79cac5029a2a5e602e9f',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber: '1234567890',
          bankAccountNumber: '12345678901234',
          dateOfBirth: new Date('1990-01-01'),
        },
        meta: {
          message: [{
            code: {
              enum: 'CUSTOMER_CREATE_SUCCESSFULLY',
              number: 10201
            },
            text: {
              developer: 'Create customer process successfully.',
              client: 'Create customer process successfully.'
            }
          }]
        }
      };

      const mockHeaders = { language: LanguageListEnum.ENGLISH } as GetLanguageDto;

      customerUseCase.CustomerCreate.mockResolvedValue(mockResponse);

      const result = await controller.CustomerCreate(mockHeaders, mockCreateDto);

      expect(result).toEqual(mockResponse);
      expect(customerUseCase.CustomerCreate).toHaveBeenCalledWith(mockCreateDto, LanguageListEnum.ENGLISH);
    });
  });

  describe('CustomerUpdate', () => {
    it('should update a customer successfully', async () => {
      const mockCustomerId = '67fd79cac5029a2a5e602e9f';
      const mockUpdateDto = new GetCustomerUpdateRequestDto();
      mockUpdateDto.firstName = 'John';
      mockUpdateDto.lastName = 'Doe';
      mockUpdateDto.email = 'john.doe@example.com';
      mockUpdateDto.phoneNumber = '1234567890';
      mockUpdateDto.bankAccountNumber = '12345678901234';
      mockUpdateDto.dateOfBirth = new Date('1990-01-01');

      const mockResponse = {
        data: {
          id: mockCustomerId,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber: '1234567890',
          bankAccountNumber: '12345678901234',
          dateOfBirth: new Date('1990-01-01'),
        },
        meta: {
          message: [{
            code: {
              enum: 'CUSTOMER_UPDATE_SUCCESSFULLY',
              number: 10201
            },
            text: {
              developer: 'Customer update process successfully.',
              client: 'Customer update process successfully.'
            }
          }]
        }
      };

      const mockHeaders = { language: LanguageListEnum.ENGLISH } as GetLanguageDto;
      const mockParams = { customerId: mockCustomerId };

      customerUseCase.CustomerUpdate.mockResolvedValue(mockResponse);

      const result = await controller.CustomerUpdate(mockHeaders, mockParams, mockUpdateDto);

      expect(result).toEqual(mockResponse);
      expect(customerUseCase.CustomerUpdate).toHaveBeenCalledWith(mockCustomerId, mockUpdateDto, LanguageListEnum.ENGLISH);
    });
  });

  describe('CustomerDelete', () => {
    it('should delete a customer successfully', async () => {
      const mockCustomerId = '67fd79cac5029a2a5e602e9f';
      const mockHeaders = { language: LanguageListEnum.ENGLISH } as GetLanguageDto;
      const mockParams = { customerId: mockCustomerId };

      const mockResponse = {
        data: {
          isDeleted: true
        },
        meta: {
          message: [{
            code: {
              enum: 'CUSTOMER_DELETE_SUCCESSFULLY',
              number: 10202
            },
            text: {
              developer: 'Customer delete process successfully.',
              client: 'Customer delete process successfully.'
            }
          }]
        }
      };

      customerUseCase.CustomerDelete.mockResolvedValue(mockResponse);

      const result = await controller.CustomerDelete(mockHeaders, mockParams);

      expect(result).toEqual(mockResponse);
      expect(customerUseCase.CustomerDelete).toHaveBeenCalledWith(mockCustomerId, LanguageListEnum.ENGLISH);
    });
  });

  describe('CustomerGet', () => {
    it('should get a customer successfully', async () => {
      const mockCustomerId = '67fd79cac5029a2a5e602e9f';
      const mockHeaders = { language: LanguageListEnum.ENGLISH } as GetLanguageDto;
      const mockParams = { customerId: mockCustomerId };

      const mockResponse = {
        data: {
          id: mockCustomerId,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber: '1234567890',
          bankAccountNumber: '12345678901234',
          dateOfBirth: new Date('1990-01-01'),
        },
        meta: {
          message: [{
            code: {
              enum: 'CUSTOMER_GET_SUCCESSFULLY',
              number: 10200
            },
            text: {
              developer: 'Customer get process successfully.',
              client: 'Customer get process successfully.'
            }
          }]
        }
      };

      customerUseCase.CustomerGet.mockResolvedValue(mockResponse);

      const result = await controller.CustomerGet(mockHeaders, mockParams);

      expect(result).toEqual(mockResponse);
      expect(customerUseCase.CustomerGet).toHaveBeenCalledWith(mockCustomerId, LanguageListEnum.ENGLISH);
    });
  });

  describe('CustomerList', () => {
    it('should list customers successfully', async () => {
      const mockPagination = new PageSizePaginationDto();
      mockPagination.page = 1;
      mockPagination.size = 10;

      const mockHeaders = { language: LanguageListEnum.ENGLISH } as GetLanguageDto;

      const mockResponse = {
        data: [
          {
            id: '67fd79cac5029a2a5e602e9f',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phoneNumber: '1234567890',
            bankAccountNumber: '12345678901234',
            dateOfBirth: new Date('1990-01-01'),
          }
        ],
        meta: {
          message: [{
            code: {
              enum: 'GET_PAGINATION_SUCCESSFULLY',
              number: 10200
            },
            text: {
              developer: 'Get pagination process successfully.',
              client: 'Get pagination process successfully.'
            }
          }],
          pagination: {
            total: 1,
            page: 1,
            size: 10,
            totalPages: 1
          }
        }
      };

      customerUseCase.CustomerList.mockResolvedValue(mockResponse);

      const result = await controller.CustomerList(mockHeaders, mockPagination);

      expect(result).toEqual(mockResponse);
      expect(customerUseCase.CustomerList).toHaveBeenCalledWith(mockPagination, LanguageListEnum.ENGLISH);
    });
  });
}); 