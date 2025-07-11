import { IWorldOptions, World, setWorldConstructor } from "@cucumber/cucumber";
import { INestApplication } from "@nestjs/common";
import request from "supertest";

export interface CustomWorld extends World {
  app: INestApplication;
  response: request.Response;
  seed: any;
}

export class NestWorld extends World implements CustomWorld {
  app!: INestApplication;
  response: any;
  seed: any = [];

  constructor(opts: IWorldOptions) {
    super(opts);
  }
}

setWorldConstructor(NestWorld);
