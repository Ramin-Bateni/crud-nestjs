import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { Customer } from '../entities/customer.entity';
import { CustomerDto } from '../dtos/customer.dto';

describe('CreateCustomerHandler', () => {
  let controller: CustomerController;

  const mockCommandBus = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CommandBus,
          useValue: mockCommandBus,
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should be return a customer', async () => {
      const dto = new CreateCustomerDto();
      const customer = new Customer();
      customer.dateOfBirth = new Date();

      mockCommandBus.execute.mockResolvedValue(customer);

      await expect(controller.create(dto)).resolves.toStrictEqual(
        CustomerDto.fromCustomer(customer),
      );
    });
  });
});
