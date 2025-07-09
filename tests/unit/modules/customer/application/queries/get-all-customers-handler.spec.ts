// tests/unit/modules/customer/application/commands/create-customer.command-handler.spec.ts
import { GetAllCustomersQuery } from "@/modules/customer/application/queries/impl/get-all-customers.query";
import { GetAllCustomersQueryHandler } from "@/modules/customer/application/queries/impl/get-all-customers.query-handler";
import { CustomerService } from "@/modules/customer/application/services/customer.service";
import { Test, TestingModule } from "@nestjs/testing";

describe("GetAllCustomersQueryHandler", () => {
  let handler: GetAllCustomersQueryHandler;
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllCustomersQueryHandler,
        {
          provide: CustomerService,
          useValue: { findAll: jest.fn() },
        },
      ],
    }).compile();

    handler = module.get<GetAllCustomersQueryHandler>(
      GetAllCustomersQueryHandler
    );
    service = module.get<CustomerService>(CustomerService);
  });

  it("should call service.findAll and return all customers", async () => {
    // Arrange
    const customers = [{ id: "1" }, { id: "2" }];

    (service.findAll as jest.Mock).mockResolvedValue(customers);

    // Act
    const result = await handler.execute(new GetAllCustomersQuery());

    // Assert
    expect(result).toEqual(customers);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  // Test when service returns empty list
  it("should return empty array if no customers", async () => {
    // Arrange
    (service.findAll as jest.Mock).mockResolvedValue([]);

    // Act
    const result = await handler.execute(new GetAllCustomersQuery());

    // Assert
    expect(result).toEqual([]);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  // Test when service throws an error
  it("should throw if service throws", async () => {
    // Arrange
    const ERROR_MSG = "Service error";
    const error = new Error(ERROR_MSG);
    (service.findAll as jest.Mock).mockRejectedValue(error);

    // Act & Assert
    await expect(handler.execute(new GetAllCustomersQuery())).rejects.toThrow(
      ERROR_MSG
    );
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });
});
