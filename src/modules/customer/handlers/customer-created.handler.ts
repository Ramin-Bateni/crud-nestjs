import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CustomerCreatedEvent } from '../events/customer-created.event';
import { CustomerModel } from '../models/customer.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@EventsHandler(CustomerCreatedEvent)
export class CustomerCreatedHandler
  implements IEventHandler<CustomerCreatedEvent>
{
  constructor(
    @InjectModel(CustomerModel.name)
    private readonly model: Model<CustomerModel>,
  ) {}

  async handle(event: CustomerCreatedEvent): Promise<void> {
    await this.model.create({
      uuid: event.id,
      firstName: event.firstName,
      lastName: event.lastName,
      dateOfBirth: event.dateOfBirth,
      email: event.email,
      phoneNumber: event.phoneNumber,
      bankAccountNumber: event.bankAccountNumber,
    });
  }
}
