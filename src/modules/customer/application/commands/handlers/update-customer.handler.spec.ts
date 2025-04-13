import { ICustomerRepository } from 'src/modules/customer/domain/repositories/customer.repository.interface';
import { UpdateCustomerHandler } from './update.customer.handler';
import { UpdateCustomerCommand } from '../update-customer.command';
import { Customer } from '../../../domain/entities/customer.entity';
import { CustomerOrmEntity } from '../../../infrastructure/typeorm/customer.orm-entity';
import { UpdateCustomerDto } from '../../dto/update-customer.dto';

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

describe('UpdateCustomerHandler', () => {
  let handler: UpdateCustomerHandler;

  beforeEach(() => {
    jest.clearAllMocks();
    handler = new UpdateCustomerHandler(mockRepo);
  });

  it('should update customer if data is valid and unique', async () => {
    const id = 'customer-id';
    const dto: UpdateCustomerDto = {
      id,
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      phoneNumber: '+989123456789',
      email: 'jane@example.com',
      bankAccountNumber: '1234567890',
    };

    mockRepo.findById.mockResolvedValue({ id } as CustomerOrmEntity);
    mockRepo.findByEmail.mockResolvedValue(null);
    mockRepo.findByIdentity.mockResolvedValue(null);
    mockRepo.update.mockImplementation(async (_, customer) =>
      Promise.resolve(customer as unknown as CustomerOrmEntity),
    );

    const command = new UpdateCustomerCommand(dto);
    const result = await handler.execute(command);

    expect(result).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockRepo.findById).toHaveBeenCalledWith(id);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockRepo.findByEmail).toHaveBeenCalledWith(dto.email);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockRepo.findByIdentity).toHaveBeenCalledWith(
      dto.firstName,
      dto.lastName,
      new Date(dto.dateOfBirth),
    );
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockRepo.update).toHaveBeenCalledWith(id, expect.any(Customer));
  });

  it('should throw if customer does not exist', async () => {
    mockRepo.findById.mockResolvedValue(null);

    const command = new UpdateCustomerCommand({
      id: 'cust-1',
      firstName: 'Test',
      lastName: 'User',
      dateOfBirth: '1990-01-01',
      phoneNumber: '+989123456789',
      email: 'test@example.com',
      bankAccountNumber: '1234567890',
    });

    await expect(handler.execute(command)).rejects.toThrow(
      'Customer not found',
    );
  });

  it('should throw if email belongs to another customer', async () => {
    mockRepo.findById.mockResolvedValue({ id: 'cust-1' } as CustomerOrmEntity);
    mockRepo.findByEmail.mockResolvedValue({
      id: 'another-id',
    } as CustomerOrmEntity);

    const command = new UpdateCustomerCommand({
      id: 'cust-1',
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      phoneNumber: '+989123456789',
      email: 'taken@example.com',
      bankAccountNumber: '1234567890',
    });

    await expect(handler.execute(command)).rejects.toThrow(
      'Email already in use',
    );
  });

  it('should throw if identity belongs to another customer', async () => {
    mockRepo.findById.mockResolvedValue({ id: 'cust-1' } as CustomerOrmEntity);
    mockRepo.findByEmail.mockResolvedValue(null);
    mockRepo.findByIdentity.mockResolvedValue({
      id: 'another-id',
    } as CustomerOrmEntity);

    const command = new UpdateCustomerCommand({
      id: 'cust-1',
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      phoneNumber: '+989123456789',
      email: 'jane@example.com',
      bankAccountNumber: '1234567890',
    });

    await expect(handler.execute(command)).rejects.toThrow(
      'Another customer with same identity exists',
    );
  });
});
