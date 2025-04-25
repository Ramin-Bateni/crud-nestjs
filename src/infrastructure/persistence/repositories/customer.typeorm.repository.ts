import { Injectable, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/core/domain/customer.entity";
import { ICustomerRepository } from "src/core/repositories/customer.repository.interface";
import { Repository } from "typeorm";
import { CustomerOrmEntity } from "../entities/customer.typeorm.entity";
import { Result } from "src/interfaces/rest/dto/result.dto";

@Injectable()
export class CustomerTypeOrmRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(CustomerOrmEntity) private ormRepo: Repository<CustomerOrmEntity>
  ) {}
  async delete(id: string): Promise<Result<void>> {
    const customer = await this.ormRepo.findOne({where: {id: id}});
    if(customer){
      await this.ormRepo.delete(id)
      return Result.ok()
    }
    return Result.fail('customer not found!')
  }
  async findById(id: string): Promise<Result<Customer | null>> {
    const customer = await this.ormRepo.findOne({where: {id: id}});
    if(customer) return Result.ok(this.mapToDomain(customer))
    return Result.fail('customer not found!')
  }
  async findByEmail(email: string): Promise<Result<Customer | null>> {
    const customer = await this.ormRepo.findOne({where: {email: email}});
    if(customer) return Result.ok(this.mapToDomain(customer))
    return Result.fail('customer not found!')
  }
  async existsByUniqueFields(firstName: string, lastName: string, dateOfBirth: Date): Promise<Result<boolean>> {
    const customer = await this.ormRepo.findOne({where: {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth
    }});
    if(customer) return Result.ok(true)
    return Result.ok(false)
  }
  async findAll(filters: { nameContains?: string }, pagination?: {limit: number;offset: number}) {
    const query = this.ormRepo.createQueryBuilder('customer');
    if (filters?.nameContains) {
      query.andWhere('customer.first_name ILIKE :name', { 
        name: `%${filters.nameContains}%` 
      });
    }
    if (pagination) {
      query.skip(pagination.offset).take(pagination.limit);
    }
    
    const customerRes: [CustomerOrmEntity[], number] = await query.getManyAndCount();
    return [customerRes[0].map(customer => this.mapToDomain(customer)), customerRes[1]] as [Customer[], number] ;  
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
      phone: customer.phoneNumber,
      bankAccountNumber: customer.bankAccountNumber,
      dateOfBirth: customer.dateOfBirth
    };
  }
  private mapToDomain(customer: CustomerOrmEntity): Customer {
    return new Customer(
      customer.id,
      customer.firstName,
      customer.lastName,
      customer.dateOfBirth,
      customer.email,
      customer.phone,
      customer.phone,
      customer.bankAccountNumber,
    );
  }
}