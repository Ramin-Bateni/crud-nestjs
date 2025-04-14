import { ICustomerRepository } from 'src/modules/customer/domain/repositories/customer.repository.interface';
import { DeleteCustomerHandler } from './delete-customer.handler';
import { DeleteCustomerCommand } from '../delete-customer.command';
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

describe('DeleteCustomerHandler', () => {
  let handler: DeleteCustomerHandler;

  beforeEach(() => {
    jest.clearAllMocks();
    handler = new DeleteCustomerHandler(mockRepo);
  });

  it('should delete customer if it exists', async () => {
    const id = 'customer-id';
    mockRepo.findById.mockResolvedValue({ id } as CustomerOrmEntity);

    const command = new DeleteCustomerCommand(id);
    await handler.execute(command);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockRepo.findById).toHaveBeenCalledWith(id);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockRepo.delete).toHaveBeenCalledWith(id);
  });

  it('should throw if customer does not exist', async () => {
    const id = 'non-existent-id';
    mockRepo.findById.mockResolvedValue(null);

    const command = new DeleteCustomerCommand(id);

    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockRepo.findById).toHaveBeenCalledWith(id);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockRepo.delete).not.toHaveBeenCalled();
  });
});
