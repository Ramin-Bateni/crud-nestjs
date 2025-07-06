import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { FindCustomerHandler } from './find-customer.handler';
import { FindCustomerQuery } from '../queries/find-customer.query';
import { FindCustomerDto } from '../dtos/find-customer.dto';

describe('FindCustomerHandler', () => {
  let handler: FindCustomerHandler;

  const mockCustomerRepo = {
    findAndCount: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindCustomerHandler,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepo,
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
    const response = [data, total];

    mockCustomerRepo.findAndCount.mockResolvedValue(response);

    await expect(handler.execute(query)).resolves.toStrictEqual({
      data,
      total,
      skip: dto.skip,
      take: dto.take,
    });
  });
});
