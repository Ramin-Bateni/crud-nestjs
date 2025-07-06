import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { UpdateCustomerHandler } from './update-customer.handler';
import { UpdateCustomerCommand } from '../commands/update-customer.command';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';

describe('UpdateCustomerHandler', () => {
  let handler: UpdateCustomerHandler;

  const mockCustomerRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCustomerHandler,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepo,
        },
      ],
    }).compile();

    handler = module.get(UpdateCustomerHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should update and return a customer', async () => {
    const id = 'some-id';
    const dto = new UpdateCustomerDto();
    const command = new UpdateCustomerCommand(id, dto);
    const customer = new Customer();
    customer.id = id;

    mockCustomerRepo.findOne.mockResolvedValue(customer);
    mockCustomerRepo.save.mockResolvedValue(customer);

    await expect(handler.execute(command)).resolves.toStrictEqual(customer);
    expect(mockCustomerRepo.save).toHaveBeenCalled();
  });

  it('should throw Error if customer does not exist', async () => {
    const id = 'some-non-existent-id';
    const dto = new UpdateCustomerDto();
    const command = new UpdateCustomerCommand(id, dto);

    mockCustomerRepo.findOne.mockResolvedValue(null);

    await expect(handler.execute(command)).rejects.toThrow(Error);
    expect(mockCustomerRepo.save).not.toHaveBeenCalled();
  });
});
