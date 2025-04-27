import { DeleteCustomerHandler } from "../../../commands/handlers/delete-customer.handler";
import { DeleteCustomerCommand } from "../../../commands/impl/delete-customer.command";
import { Customer } from "../../../../core/domain/customer.entity";
import { ICustomerRepository } from "src/core/repositories/customer.repository.interface";
import { NotFoundException } from "@nestjs/common";

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
        delete: jest.fn(),
        save: jest.fn(),
        findByEmail: jest.fn(),
        existsByEmail: jest.fn(),
        existsByUniqueFields: jest.fn(),
        findAll: jest.fn()
      };
      handler = new DeleteCustomerHandler(mockRepo);
    });
  
    it('should delete existing customer', async () => {
      mockRepo.findById.mockResolvedValue(customer);
      await handler.execute(new DeleteCustomerCommand('123'));
      expect(mockRepo.delete).toHaveBeenCalledWith('123');
    });

     // Error case
  it('should throw NotFoundException for non-existent customer', async () => {
    mockRepo.findById.mockResolvedValue(null);
    await expect(
      handler.execute(new DeleteCustomerCommand('456'))
    ).rejects.toThrow(NotFoundException);
  });

  // Edge case
  it('should not throw if softDelete fails silently', async () => {
    mockRepo.findById.mockResolvedValue(customer);
    mockRepo.delete.mockRejectedValue(new Error('DB error'));
    await expect(
      handler.execute(new DeleteCustomerCommand('789'))
    ).rejects.toThrow('DB error');
  });customer
  });