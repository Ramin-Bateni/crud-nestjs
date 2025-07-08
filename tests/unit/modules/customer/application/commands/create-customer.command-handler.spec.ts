// tests/unit/modules/customer/application/commands/create-customer.command-handler.spec.ts

import { CreateCustomerCommand } from "@/modules/customer/application/commands/impl/create-customer.command";
import { CreateCustomerCommandHandler } from "@/modules/customer/application/commands/impl/create-customer.command-handler";
import { ICustomerRepository } from "@/modules/customer/application/interfaces/customer-repository.interface";

describe("CreateCustomerCommandHandler", () => {
  let handler: CreateCustomerCommandHandler;
  let mockRepository: ICustomerRepository;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
    };
    handler = new CreateCustomerCommandHandler(mockRepository);
  });

  it("should call repository.save with customer data", async () => {
    const command = new CreateCustomerCommand(
      "John",
      "Doe",
      new Date("1990-01-01"),
      "+989123456789",
      "john@example.com",
      "1234567890123456"
    );

    await handler.execute(command);

    expect(mockRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "John",
        email: "john@example.com",
      })
    );
  });
});
