import { ICustomerRepository } from 'src/modules/customer/domain/repositories/customer.repository.interface';
import { GetCustomersHandler } from './get-customers.handler';
import { CustomerOrmEntity } from '../../../infrastructure/typeorm/customer.orm-entity';
import { Customer } from '../../../domain/entities/customer.entity';

const mockRepo = {
  create: jest.fn<Promise<CustomerOrmEntity>, [Customer]>(() =>
    Promise.resolve({} as CustomerOrmEntity),
  ),
  findById: jest.fn<Promise<CustomerOrmEntity | null>, [string]>(() =>
    Promise.resolve(null),
  ),
  findByEmail: jest.fn<Promise<CustomerOrmEntity | null>, [string]>(() =>
    Promise.resolve(null),
  ),
  findByIdentity: jest.fn<
    Promise<CustomerOrmEntity | null>,
    [string, string, Date]
  >(() => Promise.resolve(null)),
  update: jest.fn<Promise<CustomerOrmEntity>, [string, Customer]>(() =>
    Promise.resolve({} as CustomerOrmEntity),
  ),
  findAll: jest.fn<Promise<CustomerOrmEntity[]>, []>(() => Promise.resolve([])),
  delete: jest.fn<Promise<void>, [string]>(() => Promise.resolve()),
} as jest.Mocked<ICustomerRepository>;

describe('GetCustomersHandler', () => {
  let handler: GetCustomersHandler;

  beforeEach(() => {
    jest.clearAllMocks();
    handler = new GetCustomersHandler(mockRepo);
  });

  it('should return all customers', async () => {
    const mockCustomers = [
      { id: 'customer-1' } as CustomerOrmEntity,
      { id: 'customer-2' } as CustomerOrmEntity,
    ];
    mockRepo.findAll.mockResolvedValue(mockCustomers);

    const result = await handler.execute();

    expect(result).toBe(mockCustomers);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockRepo.findAll).toHaveBeenCalled();
  });
});
