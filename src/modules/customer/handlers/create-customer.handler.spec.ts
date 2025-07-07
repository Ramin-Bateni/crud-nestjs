import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCustomerHandler } from './create-customer.handler';
import { CreateCustomerCommand } from '../commands/create-customer.command';
import { Customer } from '../entities/customer.entity';
import { ConflictException } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { CustomerCreatedEvent } from '../events/customer-created.event';

describe('CreateCustomerHandler', () => {
  let handler: CreateCustomerHandler;

  const mockCustomerRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockEventBus = {
    publish: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCustomerHandler,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepo,
        },
        {
          provide: EventBus,
          useValue: mockEventBus,
        },
      ],
    }).compile();

    handler = module.get(CreateCustomerHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should create and return a new customer if none exists', async () => {
    const command = new CreateCustomerCommand(
      'John',
      'Doe',
      '1990-01-01',
      'john@example.com',
      '+14155552671',
      'DE89370400440532013000',
    );

    const createdEntity = {
      id: 'uuid-123',
      ...command,
      dateOfBirth: new Date(command.dateOfBirth),
    } as Customer;

    mockCustomerRepo.findOne.mockResolvedValue(null);
    mockCustomerRepo.create.mockReturnValue(createdEntity);
    mockCustomerRepo.save.mockResolvedValue(createdEntity);

    const result = await handler.execute(command);

    expect(mockCustomerRepo.findOne).toHaveBeenCalled();
    expect(mockCustomerRepo.create).toHaveBeenCalledWith({
      ...command,
      dateOfBirth: new Date(command.dateOfBirth),
    });
    expect(mockCustomerRepo.save).toHaveBeenCalledWith(createdEntity);
    expect(result).toEqual(createdEntity);
  });

  it('should throw ConflictException if customer already exists (by email)', async () => {
    const command = new CreateCustomerCommand(
      'Jane',
      'Smith',
      '1990-01-01',
      'jane@example.com',
      '+14155550000',
      'FR7630006000011234567890189',
    );

    mockCustomerRepo.findOne.mockResolvedValue({ id: 'existing-id' });

    await expect(handler.execute(command)).rejects.toThrow(ConflictException);
    expect(mockCustomerRepo.findOne).toHaveBeenCalled();
    expect(mockCustomerRepo.create).not.toHaveBeenCalled();
    expect(mockCustomerRepo.save).not.toHaveBeenCalled();
  });

  it('should publish CustomerCreatedEvent after creating a new customer', async () => {
    const id = 'some-id';
    const firstName = 'Jane';
    const lastName = 'Smith';
    const dateOfBirth = '1990-01-01';
    const email = 'jane@example.com';
    const phoneNumber = '+14155550000';
    const bankAccountNumber = 'FR7630006000011234567890189';

    const command = new CreateCustomerCommand(
      firstName,
      lastName,
      dateOfBirth,
      email,
      phoneNumber,
      bankAccountNumber,
    );

    mockCustomerRepo.findOne.mockResolvedValue(null);
    mockCustomerRepo.save.mockResolvedValue({
      id,
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth),
      email,
      phoneNumber,
      bankAccountNumber,
    });

    await handler.execute(command);

    expect(mockEventBus.publish).toHaveBeenCalledWith(
      new CustomerCreatedEvent(
        id,
        firstName,
        lastName,
        new Date(dateOfBirth),
        email,
        phoneNumber,
        bankAccountNumber,
      ),
    );
  });
});
