// tests/unit/modules/customer/application/queries/get-all-customers-handler.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { CqrsModule } from "@nestjs/cqrs";
import { GetAllCustomersQuery } from "@/modules/customer/application/queries/impl/get-all-customers.query";
import {
  I_CUSTOMER_REPOSITORY,
  ICustomerRepository,
} from "@/modules/customer/domain/interfaces/customer-repository.interface";
import { GetAllCustomersQueryHandler } from "@/modules/customer/application/queries/impl/get-all-customers.query-handler";
import { Customer } from "@/modules/customer/domain/customer.entity";

describe("GetAllCustomersQueryHandler", () => {
  let handler: GetAllCustomersQueryHandler;
  let repo: jest.Mocked<ICustomerRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule], // CQRS providers
      providers: [
        GetAllCustomersQueryHandler,
        {
          provide: I_CUSTOMER_REPOSITORY, // repository token
          useValue: { findAll: jest.fn() }, // mocked repository
        },
      ],
    }).compile();

    handler = module.get(GetAllCustomersQueryHandler);
    repo = module.get(I_CUSTOMER_REPOSITORY);
  });

  it("should call repository.findAll and return all customers", async () => {
    // Arrange
    const customers = [
      { firstName: "a" },
      { firstName: "b" },
    ] as unknown as Customer[];
    repo.findAll.mockResolvedValue(customers);

    // Act
    const result = await handler.execute(new GetAllCustomersQuery());

    // Assert
    expect(result).toEqual(customers);
    expect(repo.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return empty array if no customers are found", async () => {
    // Arrange
    repo.findAll.mockResolvedValue([]);

    // Act
    const result = await handler.execute(new GetAllCustomersQuery());

    // Assert
    expect(result).toEqual([]);
    expect(repo.findAll).toHaveBeenCalledTimes(1);
  });

  it("should throw if repository throws", async () => {
    // Arrange
    const error = new Error("repository error");
    repo.findAll.mockRejectedValue(error);

    // Act and Assert
    await expect(handler.execute(new GetAllCustomersQuery())).rejects.toThrow(
      "repository error"
    );
    expect(repo.findAll).toHaveBeenCalledTimes(1);
  });
});
