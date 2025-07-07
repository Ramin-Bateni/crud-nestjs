import { Test, TestingModule } from '@nestjs/testing';
import { GetCustomerHandler } from './get-customer.handler';
import { GetCustomerQuery } from '../queries/get-customer.query';
import { getModelToken } from '@nestjs/mongoose';
import { CustomerModel } from '../models/customer.model';

describe('GetCustomerHandler', () => {
  let handler: GetCustomerHandler;

  const mockModel = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetCustomerHandler,
        {
          provide: getModelToken(CustomerModel.name),
          useValue: mockModel,
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
    const fakeCustomer = {
      id,
      firstName: 'Test',
      lastName: 'User',
      dateOfBirth: '1990-01-01',
      email: 'test@example.com',
      phoneNumber: '+123456789',
      bankAccountNumber: 'NL91ABNA0417164300',
    };

    mockModel.findOne.mockResolvedValue(fakeCustomer);

    await expect(handler.execute(query)).resolves.toStrictEqual(fakeCustomer);
  });

  it('should return null if no customer found with provided id', async () => {
    const id = 'some-non-existent-id';
    const query = new GetCustomerQuery(id);

    mockModel.findOne.mockResolvedValue(null);

    await expect(handler.execute(query)).resolves.toStrictEqual(null);
  });
});
