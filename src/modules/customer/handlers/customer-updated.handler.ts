import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CustomerUpdatedEvent } from '../events/customer-updated.event';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerModel } from '../models/customer.model';
import { Model } from 'mongoose';

@EventsHandler(CustomerUpdatedEvent)
export class CustomerUpdatedHandler
  implements IEventHandler<CustomerUpdatedEvent>
{
  constructor(
    @InjectModel(CustomerModel.name)
    private readonly model: Model<CustomerModel>,
  ) {}

  async handle(event: CustomerUpdatedEvent): Promise<void> {
    await this.model.updateOne(
      { uuid: event.id },
      {
        $set: {
          ...event.updateDto,
        },
      },
    );
  }
}
