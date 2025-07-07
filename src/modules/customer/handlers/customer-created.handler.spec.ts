import { Test, TestingModule } from '@nestjs/testing';
import { CustomerCreatedHandler } from './customer-created.handler';
import { CustomerModel } from '../models/customer.model';
import { CustomerCreatedEvent } from '../events/customer-created.event';
import { getModelToken } from '@nestjs/mongoose';

describe('CustomerCreatedHandler', () => {
  let handler: CustomerCreatedHandler;

  const mockModel = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerCreatedHandler,
        {
          provide: getModelToken(CustomerModel.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    handler = module.get(CustomerCreatedHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should create the new customer in mongodb', async () => {
    const id = 'some-id';
    const firstName = 'Jane';
    const lastName = 'Smith';
    const dateOfBirth = '1990-01-01';
    const email = 'jane@example.com';
    const phoneNumber = '+14155550000';
    const bankAccountNumber = 'FR7630006000011234567890189';

    const event = new CustomerCreatedEvent(
      id,
      firstName,
      lastName,
      new Date(dateOfBirth),
      email,
      phoneNumber,
      bankAccountNumber,
    );

    await handler.handle(event);
    expect(mockModel.create).toHaveBeenCalledWith({
      uuid: id,
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth),
      email,
      phoneNumber,
      bankAccountNumber,
    });
  });
});
