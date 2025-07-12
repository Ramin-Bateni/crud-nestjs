// test/features/support/custom-world.ts

import { Customer } from "@/modules/customer/infrastructure/repositories/schemas/customer.schema";
import { IWorldOptions, World, setWorldConstructor } from "@cucumber/cucumber";
import { INestApplication } from "@nestjs/common";
import { Model } from "mongoose";
import request from "supertest";

export type flatCustomer = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  bankAccountNumber: string;
};

export interface CustomWorld extends World {
  app: INestApplication;
  response: request.Response;
  customerModel: Model<Customer>;
  firstCustomer: flatCustomer;
  seed: Array<flatCustomer>;
}

export class NestWorld extends World implements CustomWorld {
  app!: INestApplication;
  response: any;
  firstCustomer!: flatCustomer;
  seed: Array<flatCustomer> = [];
  customerModel!: Model<Customer>;

  constructor(opts: IWorldOptions) {
    super(opts);
  }
}

setWorldConstructor(NestWorld);
