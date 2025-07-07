import { Test, TestingModule } from '@nestjs/testing';
import { FindCustomerHandler } from './find-customer.handler';
import { FindCustomerQuery } from '../queries/find-customer.query';
import { FindCustomerDto } from '../dtos/find-customer.dto';
import { getModelToken } from '@nestjs/mongoose';
import { CustomerModel } from '../models/customer.model';

describe('FindCustomerHandler', () => {
  let handler: FindCustomerHandler;

  const mockLimit = jest.fn();
  const mockSkip = jest.fn(() => ({ limit: mockLimit }));
  const mockFind = jest.fn(() => ({ skip: mockSkip }));

  const mockModel = {
    find: mockFind,
    countDocuments: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindCustomerHandler,
        {
          provide: getModelToken(CustomerModel.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    handler = module.get(FindCustomerHandler);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should find customers with provided dto', async () => {
    const dto = new FindCustomerDto();
    const query = new FindCustomerQuery(dto);
    const data = [];
    const total = 0;

    mockLimit.mockResolvedValue(data);
    mockModel.countDocuments.mockResolvedValue(total);

    await expect(handler.execute(query)).resolves.toStrictEqual({
      data,
      total,
      skip: dto.skip,
      take: dto.take,
    });
  });
});
