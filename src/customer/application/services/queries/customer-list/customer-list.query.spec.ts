import { Test, TestingModule } from '@nestjs/testing';
import { CustomerListHandler } from './customer-list.query';
import { CustomerMongoRepository } from '../../../../domain/services/repositories';
import { CustomerListQuery } from './customer-list.handler';
import { PageSizePaginationDto } from '@/common/pagination';
import { GetCustomersMap } from '@/customer/application/map';
import { Types } from 'mongoose';
import { CustomerDocument } from '../../../../domain/models/entities';
import { I18nTestModule } from '@/common/test/i18n-test.module';

jest.mock('@/customer/application/map', () => ({
  GetCustomersMap: {
    items: jest.fn(),
  },
}));

describe('CustomerListHandler', () => {
  let handler: CustomerListHandler;
  let customerMongoRepository: jest.Mocked<CustomerMongoRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [I18nTestModule],
      providers: [
        CustomerListHandler,
        {
          provide: CustomerMongoRepository,
          useValue: {
            PageSizePagination: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<CustomerListHandler>(CustomerListHandler);
    customerMongoRepository = module.get(CustomerMongoRepository);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('execute', () => {
    const mockPagination = new PageSizePaginationDto();
    mockPagination.page = 1;
    mockPagination.size = 10;

    const mockQuery = new CustomerListQuery(mockPagination, 'en');

    it('should list customers successfully', async () => {
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

      const mockMappedCustomers = mockCustomers.map(customer => ({
        id: customer?._id?.toString() || '',
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        bankAccountNumber: customer.bankAccountNumber,
        dateOfBirth: customer.dateOfBirth,
      }));

      customerMongoRepository.PageSizePagination.mockResolvedValue({
        data: mockCustomers,
        pagination: {
          total: 100,
          perPage: 10,
          currentPage: 1,
          countPage: 10,
          from: 1,
          to: 10,
          nextPage: 2,
          previousPage: null,
        },
      });

      (GetCustomersMap.items as jest.Mock).mockResolvedValue(mockMappedCustomers);

      const result = await handler.execute(mockQuery);

      expect(result).toBeDefined();
      expect(result.data).toEqual(mockMappedCustomers);
      expect(result.pagination).toBeDefined();
      expect(customerMongoRepository.PageSizePagination).toHaveBeenCalledWith(
        {},
        mockPagination.page,
        mockPagination.size,
        'created_at',
        'DESC'
      );
      expect(GetCustomersMap.items).toHaveBeenCalledWith(mockCustomers);
    });
  });
}); 