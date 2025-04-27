import { UpdateCustomerHandler } from "../../../commands/handlers/update-cusromer.handler";
import { UpdateCustomerCommand } from "../../../commands/impl/update-customer.command";
import { ICustomerRepository } from "../../../../core/repositories/customer.repository.interface";
import { Customer } from "../../../../core/domain/customer.entity";
import { NotFoundException, ConflictException } from "@nestjs/common";
import { PhoneValidator } from "../../../../infrastructure/validation/phone.validator";

describe('UpdateCustomerHandler', () => {
  let handler: UpdateCustomerHandler;
  let mockRepo: jest.Mocked<ICustomerRepository>;
  let mockPhoneValidator: jest.Mocked<PhoneValidator>

  const existingCustomer = new Customer( '1','John', 'duo', new Date('1991'), '+1111111111', '+1111111111', 'john@gmail.com', 'GMd8787878787878' )

  beforeEach(() => {
    mockRepo = {
        findById: jest.fn(),
        delete: jest.fn(),
        save: jest.fn(),
        findByEmail: jest.fn(),
        existsByEmail: jest.fn(),
        existsByUniqueFields: jest.fn(),
        findAll: jest.fn()
    } as unknown as jest.Mocked<ICustomerRepository>;

    mockPhoneValidator = {
        validate: jest.fn(),
        normalize: jest.fn()
      }
      
    handler = new UpdateCustomerHandler(mockRepo, mockPhoneValidator);
  });

  it('should update customer phone number', async () => {
    // Arrange
    mockRepo.findById.mockResolvedValue(existingCustomer);

    // Act
    await handler.execute(new UpdateCustomerCommand(
        '1',
        'John',
        'duo', 
        '+2222222222', 
        'john@gmail.com', 
        'GMd8787878787878'
    ));

    // Assert
    expect(existingCustomer.phoneNumber).toBe('+2222222222');
    expect(mockRepo.save).toHaveBeenCalled();
  });

  it('should throw when customer not found', async () => {
    // Arrange
    mockRepo.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(
      handler.execute(new UpdateCustomerCommand('999'))
    ).rejects.toThrow(NotFoundException);
  });
});