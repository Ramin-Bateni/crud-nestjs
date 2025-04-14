import { CustomerCreateHandler } from './customer-create';
import { CustomerUpdateHandler } from './customer-update';

export * from './customer-create';
export * from './customer-update';

export const CommandHandlers = [
    CustomerCreateHandler, 
    CustomerUpdateHandler,
];
