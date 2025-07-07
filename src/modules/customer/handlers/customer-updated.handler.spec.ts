import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CustomerUpdatedHandler } from './customer-updated.handler';
import { CustomerModel } from '../models/customer.model';
import { CustomerUpdatedEvent } from '../events/customer-updated.event';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';

describe('CustomerUpdatedHandler', () => {
  let handler: CustomerUpdatedHandler;

  const mockModel = {
    updateOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerUpdatedHandler,
        {
          provide: getModelToken(CustomerModel.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    handler = module.get(CustomerUpdatedHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should update the customer in mongodb', async () => {
    const id = 'some-id';
    const dto = new UpdateCustomerDto();
    dto.email = 'jane@example.com';
    dto.phoneNumber = '+14155550000';
    dto.bankAccountNumber = 'FR7630006000011234567890189';

    const event = new CustomerUpdatedEvent(id, dto);

    await handler.handle(event);
    expect(mockModel.updateOne).toHaveBeenCalledWith(
      {
        uuid: id,
      },
      {
        $set: { ...dto },
      },
    );
  });
});
