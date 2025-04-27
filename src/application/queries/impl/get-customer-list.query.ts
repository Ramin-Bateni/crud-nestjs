export class GetCustomerListQuery {
    constructor(
      public readonly filters?: {
        nameContains?: string;
      },
      public readonly pagination?: {
        limit: number;
        offset: number;
      }
    ) {}
  }