// tests/unit/modules/customer/application/commands/create-customer.command-handler.spec.ts

import { CreateCustomerCommand } from "@/modules/customer/application/commands/impl/create-customer.command";
import { CreateCustomerCommandHandler } from "@/modules/customer/application/commands/impl/create-customer.command-handler";
import { ICustomerRepository } from "@/modules/customer/application/interfaces/customer-repository.interface";
import { Customer } from "@/modules/customer/domain/customer.entity";

describe("CreateCustomerCommandHandler", () => {
  let handler: CreateCustomerCommandHandler;
  let mockRepository: ICustomerRepository;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
    };
    handler = new CreateCustomerCommandHandler(mockRepository);
  });

  it("should call repository.create with customer data", async () => {
    const command = new CreateCustomerCommand(
      "Emily",
      "Johnson",
      new Date("1988-03-22"),
      "+447911123456",
      "emily.johnson@example.com",
      "GB29NWBK60161331926819"
    );

    await handler.execute(command);

    // I expect to see Emily name in the object to pass to `create`
    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "Emily",
        lastName: "Johnson",
      })
    );

    // I expect to call the `create` method with `Customer` entity
    expect(mockRepository.create).toHaveBeenCalledWith(expect.any(Customer));
  });
});
