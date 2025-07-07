import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { DeleteCustomerHandler } from './delete-customer.handler';
import { DeleteCustomerCommand } from '../commands/delete-customer.command';
import { EventBus } from '@nestjs/cqrs';
import { CustomerDeletedEvent } from '../events/customer-deleted.event';

describe('DeleteCustomerHandler', () => {
  let handler: DeleteCustomerHandler;

  const mockCustomerRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockEventBus = {
    publish: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCustomerHandler,
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

    handler = module.get(DeleteCustomerHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should delete a customer', async () => {
    const id = 'some-id';
    const command = new DeleteCustomerCommand(id);

    mockCustomerRepo.delete.mockResolvedValue(undefined);

    await expect(handler.execute(command)).resolves.toBeUndefined();
    expect(mockCustomerRepo.delete).toHaveBeenCalledWith({ id });
  });

  it('should publish CustomerDeletedEvent', async () => {
    const id = 'some-id';
    const command = new DeleteCustomerCommand(id);

    mockCustomerRepo.delete.mockResolvedValue(undefined);

    await handler.execute(command);
    expect(mockEventBus.publish).toHaveBeenCalledWith(
      new CustomerDeletedEvent(id),
    );
  });
});
