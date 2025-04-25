import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/core/domain/customer.entity";
import { ICustomerRepository } from "src/core/repositories/customer.repository.interface";
import { Repository } from "typeorm";
import { CustomerOrmEntity } from "../entities/customer.typeorm.entity";
import { Result } from "src/interfaces/rest/dto/result.dto";

@Injectable()
export class CustomerTypeOrmRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(CustomerOrmEntity)
    private ormRepo: Repository<CustomerOrmEntity>
  ) {}
  delete(customer: Customer): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Customer | null> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<Customer | null> {
    throw new Error("Method not implemented.");
  }
  existsByUniqueFields(firstName: string, lastName: string, dateOfBirth: Date): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }

  async save(customer: Customer): Promise<Result<void>> {
    await this.ormRepo.save(this.mapToOrm(customer));
    return Result.ok();
  }

  private mapToOrm(customer: Customer): CustomerOrmEntity {
    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      bankAccountNumber: customer.bankAccountNumber,
      dateOfBirth: customer.dateOfBirth
    };
  }
}