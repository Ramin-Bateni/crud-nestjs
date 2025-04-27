import { GetCustomerListHandler } from "../../../queries/handlers/get-customer-list.handler";
import { GetCustomerListQuery } from "../../../queries/impl/get-customer-list.query";
import { ICustomerRepository } from "../../../../core/repositories/customer.repository.interface";
import { Customer } from "../../../../core/domain/customer.entity";

describe('GetCustomerListHandler', () => {
  let handler: GetCustomerListHandler;
  let mockRepo: jest.Mocked<ICustomerRepository>;

  beforeEach(() => {
    mockRepo = {
      findAll: jest.fn().mockResolvedValue([[], 0]),
      // ... other methods
    } as unknown as jest.Mocked<ICustomerRepository>;

    handler = new GetCustomerListHandler(mockRepo);
  });

  it('should return paginated results', async () => {
    const testCustomers = [
      new Customer( '1','John', 'duo', new Date('1991'), '+1111111111', '+1111111111', 'john@gmail.com', 'GMd8787878787878' ),
      new Customer( '1','Jane', 'black', new Date('1995'), '+2111111111', '+2111111111', 'jane@gmail.com', 'GMd878oo78787878' ),
    ];
    mockRepo.findAll.mockResolvedValue([testCustomers, 2]);

    // Act
    const result = await handler.execute(
      new GetCustomerListQuery(
        {}, 
        { limit: 10, offset: 0 }
      )
    );

    // Assert
    expect(result.data.length).toBe(2);
    expect(result.total).toBe(2);
    expect(mockRepo.findAll).toHaveBeenCalledWith(
      {}, 
      { limit: 10, offset: 0 }
    );
  });
});