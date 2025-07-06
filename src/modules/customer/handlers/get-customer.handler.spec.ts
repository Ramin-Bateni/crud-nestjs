import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { GetCustomerHandler } from './get-customer.handler';
import { GetCustomerQuery } from '../queries/get-customer.query';

describe('GetCustomerHandler', () => {
  let handler: GetCustomerHandler;

  const mockCustomerRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetCustomerHandler,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepo,
        },
      ],
    }).compile();

    handler = module.get(GetCustomerHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return the customer with provided id', async () => {
    const id = 'some-id';
    const query = new GetCustomerQuery(id);
    const customer = new Customer();
    customer.id = id;

    mockCustomerRepo.findOne.mockResolvedValue(customer);

    await expect(handler.execute(query)).resolves.toStrictEqual(customer);
  });

  it('should return null if no customer found with provided id', async () => {
    const id = 'some-non-existent-id';
    const query = new GetCustomerQuery(id);

    mockCustomerRepo.findOne.mockResolvedValue(null);

    await expect(handler.execute(query)).resolves.toStrictEqual(null);
  });
});
