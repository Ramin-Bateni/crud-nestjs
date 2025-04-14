import { CustomerCreateHandler } from './customer-create';
import { CustomerUpdateHandler } from './customer-update';
import { CustomerDeleteHandler } from './customer-delete';

export * from './customer-create';
export * from './customer-update';
export * from './customer-delete';

export const CommandHandlers = [
    CustomerCreateHandler, 
    CustomerUpdateHandler,
    CustomerDeleteHandler,
];
