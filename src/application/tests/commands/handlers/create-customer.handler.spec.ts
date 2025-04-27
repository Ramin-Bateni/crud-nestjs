import { CreateCustomerHandler } from "../../../commands/handlers/create-customer.handler";
import { CreateCustomerCommand } from "../../../commands/impl/create-customer.command";
import { ICustomerRepository } from "../../../../core/repositories/customer.repository.interface";
import { CustomerValidator } from "../../../../core/services/customer.validator.service";
import { PhoneValidator } from "../../../../infrastructure/validation/phone.validator";
import { ConflictException } from "@nestjs/common";

describe('CreateCustomerHandler', () => {
  let handler: CreateCustomerHandler;
  let mockRepo: jest.Mocked<ICustomerRepository>;
  let mockCustomerValidator: jest.Mocked<CustomerValidator>;
  let mockPhoneValidator: jest.Mocked<PhoneValidator>;

  beforeEach(() => {
    // 1. Mock all dependencies
    mockRepo = {
      existsByEmail: jest.fn(),
      existsByUniqueFields: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<ICustomerRepository>;

    mockCustomerValidator = {
      validate: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<CustomerValidator>;

    mockPhoneValidator = {
      validate: jest.fn().mockReturnValue({ isValid: true, normalizedNumber: '+1234567890' }),
    } as unknown as jest.Mocked<PhoneValidator>;

    // 2. Initialize handler with ALL dependencies
    handler = new CreateCustomerHandler(
      mockRepo,
      mockCustomerValidator,
      mockPhoneValidator
    );
  });

  it('should create customer with valid input', async () => {
    // Arrange
    const command = new CreateCustomerCommand(
      "John",
      "Doe",
      new Date("1990-01-01"),
      "+1234567890",
      "john@test.com",
      "DE89370400440532013000"
    );

    // Act
    await handler.execute(command);

    // Assert
    expect(mockRepo.save).toHaveBeenCalled();
    expect(mockPhoneValidator.validate).toHaveBeenCalledWith("+1234567890");
  });

  it('should throw when email exists', async () => {
    // Arrange
    mockRepo.existsByEmail.mockResolvedValue(true);
    const command = new CreateCustomerCommand(
      "John",
      "Doe",
      new Date("1990-01-01"),
      "+1234567890",
      "john@test.com",
      "DE89370400440532013000"
    );

    // Act & Assert
    await expect(handler.execute(command)).rejects.toThrow(ConflictException);
  });
});