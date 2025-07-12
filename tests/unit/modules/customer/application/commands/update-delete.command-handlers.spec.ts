// tests/unit/modules/customer/application/commands/update-delete.handlers.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";

import {
  I_CUSTOMER_REPOSITORY,
  ICustomerRepository,
} from "@/modules/customer/domain/interfaces/customer-repository.interface";
import { DeleteCustomerCommandHandler } from "@/modules/customer/application/commands/impl/delete-customer.command-handler";
import { UpdateCustomerCommandHandler } from "@/modules/customer/application/commands/impl/update-customer.handler";
import { UpdateCustomerCommand } from "@/modules/customer/application/commands/impl/update-customer.command";
import { DeleteCustomerCommand } from "@/modules/customer/application/commands/impl/delete-customer.command";

describe("Update & Delete Customer Handlers", () => {
  let updateHandler: UpdateCustomerCommandHandler;
  let deleteHandler: DeleteCustomerCommandHandler;
  let repo: jest.Mocked<ICustomerRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCustomerCommandHandler,
        DeleteCustomerCommandHandler,
        {
          provide: I_CUSTOMER_REPOSITORY,
          useValue: {
            updateByEmail: jest.fn(),
            deleteByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    updateHandler = module.get(UpdateCustomerCommandHandler);
    deleteHandler = module.get(DeleteCustomerCommandHandler);
    repo = module.get(I_CUSTOMER_REPOSITORY);
  });

  it("updates customer and returns entity", async () => {
    const email = "foo@example.com";
    const domainFake = { email, firstName: "Foo" } as any; // minimal stub

    repo.updateByEmail.mockResolvedValue(domainFake);

    const result = await updateHandler.execute(
      new UpdateCustomerCommand(email, { firstName: "Foo" })
    );

    expect(repo.updateByEmail).toHaveBeenCalledWith(email, {
      firstName: "Foo",
    });
    expect(result).toBe(domainFake);
  });

  it("throws NotFoundException when update returns null", async () => {
    repo.updateByEmail.mockResolvedValue(null);

    await expect(
      updateHandler.execute(
        new UpdateCustomerCommand("missing@example.com", { firstName: "Foo" })
      )
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it("deletes customer successfully", async () => {
    repo.deleteByEmail.mockResolvedValue(true);

    await expect(
      deleteHandler.execute(new DeleteCustomerCommand("foo@example.com"))
    ).resolves.not.toThrow();
    expect(repo.deleteByEmail).toHaveBeenCalledWith("foo@example.com");
  });

  it("throws NotFoundException when delete returns false", async () => {
    repo.deleteByEmail.mockResolvedValue(false);

    await expect(
      deleteHandler.execute(new DeleteCustomerCommand("missing@example.com"))
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
