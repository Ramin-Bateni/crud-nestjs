import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CustomerController } from 'src/presentation/controllers/customer.controller';
import { Customer } from 'src/domain/entities/customer.entity';
import { CustomerRepository } from 'src/infrastructure/database/customer.repository';
import { BankAccountValidator } from 'src/infrastructure/validators/bank-account.validator';
import { PhoneNumberValidator } from 'src/infrastructure/validators/phone-number.validator';
import { CreateCustomerHandler } from 'src/application/commands/handlers/create-customer.handler';
import { UpdateCustomerHandler } from 'src/application/commands/handlers/update-customer.handler';
import { DeleteCustomerHandler } from 'src/application/commands/handlers/delete-customer.handler';
import { GetCustomersHandler } from 'src/application/queries/handlers/get-customers.handler';
import { GetCustomerByIdHandler } from 'src/application/queries/handlers/get-customer-by-id.handler';

const commandHandlers = [
  CreateCustomerHandler,
  UpdateCustomerHandler,
  DeleteCustomerHandler,
];

const queryHandlers = [GetCustomersHandler, GetCustomerByIdHandler];

const validators = [BankAccountValidator, PhoneNumberValidator];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Customer],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Customer]),
    CqrsModule,
  ],
  controllers: [CustomerController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...validators,
    {
      provide: 'ICustomerRepository',
      useClass: CustomerRepository,
    },
  ],
})
export class AppModule {}
