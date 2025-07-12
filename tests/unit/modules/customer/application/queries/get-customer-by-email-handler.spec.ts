// tests/unit/modules/customer/application/queries/get-all-customers-handler.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { CqrsModule } from "@nestjs/cqrs";
import {
  I_CUSTOMER_REPOSITORY,
  ICustomerRepository,
} from "@/modules/customer/domain/interfaces/customer-repository.interface";
import { Customer } from "@/modules/customer/domain/customer.entity";
import { GetCustomerByEmailQuery } from "@/modules/customer/application/queries/impl/get-customer-by-email.query";
import { GetCustomerByEmailQueryHandler } from "@/modules/customer/application/queries/impl/get-customer-by-email.query-handler";

describe("GetAllCustomersQueryHandler", () => {
  let handler: GetCustomerByEmailQueryHandler;
  let repo: jest.Mocked<ICustomerRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule], // CQRS providers
      providers: [
        GetCustomerByEmailQueryHandler,
        {
          provide: I_CUSTOMER_REPOSITORY, // repository token
          useValue: { findByEmail: jest.fn() }, // mocked repository
        },
      ],
    }).compile();

    handler = module.get(GetCustomerByEmailQueryHandler);
    repo = module.get(I_CUSTOMER_REPOSITORY);
  });

  it("should call repository.findByEmail and return expected customer", async () => {
    // Arrange
    const targetCustomer = { firstName: "a", email: "a@a.com" };

    repo.findByEmail.mockResolvedValue(targetCustomer as unknown as Customer);

    // Act
    const result = await handler.execute(
      new GetCustomerByEmailQuery(targetCustomer.email)
    );

    // Assert
    expect(result).toEqual(targetCustomer);
    expect(repo.findByEmail).toHaveBeenCalledTimes(1);
  });

  it("should return null if the customers not found", async () => {
    // Arrange
    const targetCustomer = { firstName: "a", email: "a@a.com" };

    repo.findByEmail.mockResolvedValue(null);

    // Act
    const result = await handler.execute(
      new GetCustomerByEmailQuery(targetCustomer.email)
    );

    // Assert
    expect(result).toEqual(null);
    expect(repo.findByEmail).toHaveBeenCalledTimes(1);
  });

  it("should throw if repository throws", async () => {
    // Arrange
    const targetCustomer = { firstName: "a", email: "a@a.com" };
    const error = new Error("repository error");
    repo.findByEmail.mockRejectedValue(error);

    // Act and Assert
    await expect(
      handler.execute(new GetCustomerByEmailQuery(targetCustomer.email))
    ).rejects.toThrow("repository error");
    expect(repo.findByEmail).toHaveBeenCalledTimes(1);
  });
});
