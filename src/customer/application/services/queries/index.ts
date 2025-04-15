import { CustomerGetHandler } from './customer-get';
import { CustomerListHandler } from './customer-list';

export * from './customer-get';
export * from './customer-list';

export const QueryHandlers = [
    CustomerGetHandler,
    CustomerListHandler,
];