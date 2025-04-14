import { ICustomerRepository } from 'src/modules/customer/domain/repositories/customer.repository.interface';
import { GetCustomerHandler } from './get-customer.handler';
import { GetCustomerQuery } from '../get-customer.query';
import { CustomerOrmEntity } from '../../../infrastructure/typeorm/customer.orm-entity';
import { NotFoundException } from '@nestjs/common';
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

describe('GetCustomerHandler', () => {
  let handler: GetCustomerHandler;

  beforeEach(() => {
    jest.clearAllMocks();
    handler = new GetCustomerHandler(mockRepo);
  });

  it('should return customer if it exists', async () => {
    const id = 'customer-id';
    const mockCustomer = { id } as CustomerOrmEntity;
    mockRepo.findById.mockResolvedValue(mockCustomer);

    const query = new GetCustomerQuery(id);
    const result = await handler.execute(query);

    expect(result).toBe(mockCustomer);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
  });

  it('should throw if customer does not exist', async () => {
    const id = 'non-existent-id';
    mockRepo.findById.mockResolvedValue(null);

    const query = new GetCustomerQuery(id);

    await expect(handler.execute(query)).rejects.toThrow(NotFoundException);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
  });
});
