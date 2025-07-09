// tests/unit/modules/customer/application/commands/create-customer.command-handler.spec.ts

import { CreateCustomerCommand } from "@/modules/customer/application/commands/impl/create-customer.command";
import { CreateCustomerCommandHandler } from "@/modules/customer/application/commands/impl/create-customer.command-handler";
import { CustomerService } from "@/modules/customer/application/services/customer.service";
import { Customer } from "@/modules/customer/domain/customer.entity";

describe("CreateCustomerCommandHandler", () => {
  let handler: CreateCustomerCommandHandler;
  let mockService: CustomerService;

  beforeEach(() => {
    mockService = {
      create: jest.fn(),
    } as unknown as CustomerService;

    handler = new CreateCustomerCommandHandler(mockService);
  });

  it("should call service.create with customer data", async () => {
    // Arrange
    const command = new CreateCustomerCommand(
      "Emily",
      "Johnson",
      new Date("1988-03-22"),
      "+447911123456",
      "emily.johnson@example.com",
      "GB29NWBK60161331926819"
    );

    // Act
    await handler.execute(command);

    // Assert
    // I expect to see Emily name in the object to pass to `create`
    expect(mockService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "Emily",
        lastName: "Johnson",
      })
    );

    // I expect to call the `create` method with `Customer` entity
    expect(mockService.create).toHaveBeenCalledWith(expect.any(Customer));
  });
});
