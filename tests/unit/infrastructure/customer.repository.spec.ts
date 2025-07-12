// tests/unit/modules/customer/infrastructure/customer.repository.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { CustomerRepository } from "@/modules/customer/infrastructure/repositories/customer.repository";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "@/modules/customer/domain/customer.entity";
import { PhoneNumber } from "@/modules/customer/domain/value-objects/phone-number.vo";
import { Email } from "@/modules/customer/domain/value-objects/email.vo";
import { BankAccountNumber } from "@/modules/customer/domain/value-objects/bank-account-number.vo";

describe("CustomerMongoRepository – update & delete", () => {
  let repo: CustomerRepository;
  let model: jest.Mocked<Model<Customer>>;
  const updateReturnObj = {
    acknowledged: true,
    matchedCount: 0,
    modifiedCount: 0,
    upsertedCount: 0,
    upsertedId: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerRepository,
        {
          provide: getModelToken(Customer.name),
          useValue: {
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    repo = module.get(CustomerRepository);
    model = module.get(getModelToken(Customer.name));
  });

  it("updates customer and returns updated entity", async () => {
    // Arrange
    // I stub PhoneNumber validation once to be independent of LibPhoneNumber dataset
    jest.spyOn(PhoneNumber as any, "isValid").mockReturnValue(true);
    jest.spyOn(Email as any, "isValid").mockReturnValue(true);
    jest.spyOn(BankAccountNumber as any, "isValid").mockReturnValue(true);

    const fake = {
      firstName: "Old",
      lastName: "User",
      dateOfBirth: new Date("1990-01-01"),
      phoneNumber: "+4915112345678",
      email: "foo@example.com",
      bankAccountNumber: "GB11BARC20040199999999",
    };

    const customerDomain = new Customer(
      fake.firstName,
      fake.lastName,
      new Date(fake.dateOfBirth),
      new PhoneNumber(fake.phoneNumber),
      new Email(fake.email),
      new BankAccountNumber(fake.bankAccountNumber)
    );
    const expectedCustomerDomain = { ...customerDomain, firstName: "Foo" };

    model.updateOne.mockResolvedValue({ ...updateReturnObj, modifiedCount: 1 });

    model.findOne.mockReturnValue({
      toObject: jest.fn().mockReturnValue(expectedCustomerDomain),
    } as any);

    // Act
    const result = await repo.updateByEmail("foo@example.com", {
      firstName: "Foo",
    });

    // Assert
    expect(model.updateOne).toHaveBeenCalledWith(
      { email: "foo@example.com" },
      { $set: { firstName: "Foo" } }
    );

    expect(result).toEqual(
      expect.objectContaining({
        firstName: "Foo",
        email: expect.any(Email),
        phoneNumber: expect.any(PhoneNumber),
      })
    );
  });

  it("returns null when update hits no document", async () => {
    // Arrange
    model.updateOne.mockResolvedValue({
      ...updateReturnObj,
      modifiedCount: 0,
    });

    // Act
    const result = await repo.updateByEmail("missing", { firstName: "Foo" });

    // Assert
    expect(result).toBeNull();
  });

  it("deletes customer and returns true", async () => {
    // Arrange
    model.deleteOne.mockResolvedValue({ acknowledged: true, deletedCount: 1 });

    // Act
    const result = await repo.deleteByEmail("id1");

    // Assert
    expect(result).toBe(true);
  });

  it("returns false when delete hits no document", async () => {
    // Arrange
    model.deleteOne.mockResolvedValue({ acknowledged: true, deletedCount: 0 });

    // Act
    const result = await repo.deleteByEmail("missing");

    // Assert
    expect(result).toBe(false);
  });
});
