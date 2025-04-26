import { DeleteCustomerHandler } from "src/application/commands/handlers/delete-customer.handler";
import { DeleteCustomerCommand } from "src/application/commands/impl/delete-customer.command";
import { Customer } from "src/core/domain/customer.entity";
import { ICustomerRepository } from "src/core/repositories/customer.repository.interface";

describe('DeleteCustomerHandler', () => {
    let handler: DeleteCustomerHandler;
    let mockRepo: jest.Mocked<ICustomerRepository>;

    const customer = new Customer(
        '1',
        'meysam',
        'goodarzi',
        new Date("1991"),
        '+989190960307',
        '+989190960307',
        'meysam.g7@gmail.com',
        'DEF7845787854548'
    )
  
    beforeEach(() => {
      mockRepo = {
        findById: jest.fn(),
        delete: jest.fn()
      };
      handler = new DeleteCustomerHandler(mockRepo);
    });
  
    it('should delete existing customer', async () => {
      mockRepo.findById.mockResolvedValue(customer);
      await handler.execute(new DeleteCustomerCommand('123'));
      expect(mockRepo.delete).toHaveBeenCalledWith('123');
    });
  });