import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CustomerDeletedHandler } from './customer-deleted.handler';
import { CustomerModel } from '../models/customer.model';
import { CustomerDeletedEvent } from '../events/customer-deleted.event';

describe('CustomerDeletedHandler', () => {
  let handler: CustomerDeletedHandler;

  const mockModel = {
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerDeletedHandler,
        {
          provide: getModelToken(CustomerModel.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    handler = module.get(CustomerDeletedHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should delete the customer in mongodb', async () => {
    const id = 'some-id';

    const event = new CustomerDeletedEvent(id);

    await handler.handle(event);
    expect(mockModel.deleteOne).toHaveBeenCalledWith({
      uuid: id,
    });
  });
});
