import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Customer])],
  providers: [],
})
export class CustomerModule {}
