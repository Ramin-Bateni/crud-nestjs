import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { Customer } from '../entities/customer.entity';
import { CustomerDto } from '../dtos/customer.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { DeleteCustomerCommand } from '../commands/delete-customer.command';
import { FindCustomerDto } from '../dtos/find-customer.dto';

describe('CreateCustomerHandler', () => {
  let controller: CustomerController;

  const mockCommandBus = {
    execute: jest.fn(),
  };

  const mockQueryBus = {
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
        {
          provide: QueryBus,
          useValue: mockQueryBus,
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

  describe('find()', () => {
    it('should find customers', async () => {
      const dto = new FindCustomerDto();
      const customer = new Customer();
      customer.dateOfBirth = new Date();

      const result = {
        data: [customer],
        total: 1,
        skip: dto.skip,
        take: dto.take,
      };

      mockQueryBus.execute.mockResolvedValue(result);

      await expect(controller.find(dto)).resolves.toStrictEqual({
        ...result,
        data: [CustomerDto.fromCustomer(customer)],
      });
    });
  });

  describe('get()', () => {
    it('should be return a customer', async () => {
      const id = 'some-id';
      const customer = new Customer();
      customer.dateOfBirth = new Date();

      mockQueryBus.execute.mockResolvedValue(customer);

      await expect(controller.get(id)).resolves.toStrictEqual(
        CustomerDto.fromCustomer(customer),
      );
    });

    it('should throw if no customer found with provided id', async () => {
      const id = 'some-non-existing-id';

      mockQueryBus.execute.mockResolvedValue(null);

      await expect(controller.get(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update()', () => {
    it('should be return a customer', async () => {
      const id = 'some-id';
      const dto = new UpdateCustomerDto();
      const customer = new Customer();
      customer.dateOfBirth = new Date();

      mockCommandBus.execute.mockResolvedValue(customer);

      await expect(controller.update(id, dto)).resolves.toStrictEqual(
        CustomerDto.fromCustomer(customer),
      );
    });
  });

  describe('delete()', () => {
    it('should delete a customer', async () => {
      const id = 'some-id';
      const command = new DeleteCustomerCommand(id);

      mockCommandBus.execute.mockResolvedValue(undefined);

      await expect(controller.delete(id)).resolves.toBeUndefined();
      expect(mockCommandBus.execute).toHaveBeenCalledWith(command);
    });
  });
});
