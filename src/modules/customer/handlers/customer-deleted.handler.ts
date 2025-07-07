import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CustomerDeletedEvent } from '../events/customer-deleted.event';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerModel } from '../models/customer.model';
import { Model } from 'mongoose';

@EventsHandler(CustomerDeletedEvent)
export class CustomerDeletedHandler
  implements IEventHandler<CustomerDeletedEvent>
{
  constructor(
    @InjectModel(CustomerModel.name)
    private readonly model: Model<CustomerModel>,
  ) {}

  async handle(event: CustomerDeletedEvent): Promise<void> {
    await this.model.deleteOne({ uuid: event.id });
  }
}
