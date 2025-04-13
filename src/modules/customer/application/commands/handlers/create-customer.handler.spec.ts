import { ICustomerRepository } from 'src/modules/customer/domain/repositories/customer.repository.interface';
import { CreateCustomerHandler } from './create-customer.handler';
import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { CreateCustomerCommand } from '../create-customer.command';
// import { Customer } from 'src/modules/customer/domain/entities/customer.entity';
import { Customer } from '../../../domain/entities/customer.entity';

const mockRepo = {
  create: jest.fn<Promise<Customer>, [Customer]>(() =>
    Promise.resolve({} as Customer),
  ),
  findByEmail: jest.fn<Promise<Customer | null>, [string]>(() =>
    Promise.resolve(null),
  ),
  findByIdentity: jest.fn<Promise<Customer | null>, [string, string, Date]>(
    () => Promise.resolve(null),
  ),
  findAll: jest.fn<Promise<Customer[]>, []>(() => Promise.resolve([])),
} as jest.Mocked<ICustomerRepository>;

describe('CreateCustomerHandler', () => {
  let handler: CreateCustomerHandler;

  beforeEach(() => {
    jest.clearAllMocks();
    handler = new CreateCustomerHandler(mockRepo);
  });

  it('should create customer if data is valid and unique', async () => {
    const dto: CreateCustomerDto = {
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      phoneNumber: '+12345678901',
      email: 'jane@example.com',
      bankAccountNumber: '1234567890',
    };

    mockRepo.findByEmail.mockResolvedValue(null);
    mockRepo.findByIdentity.mockResolvedValue(null);
    mockRepo.create.mockImplementation(async (customer) =>
      Promise.resolve(customer),
    );

    const result = await handler.execute(new CreateCustomerCommand(dto));

    expect(result).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockRepo.findByEmail).toHaveBeenCalledWith(dto.email);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockRepo.findByIdentity).toHaveBeenCalledWith(
      dto.firstName,
      dto.lastName,
      new Date(dto.dateOfBirth),
    );
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockRepo.create).toHaveBeenCalledWith(expect.any(Customer));
  });
});
