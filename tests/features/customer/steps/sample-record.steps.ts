// tests/features/common/steps/customer-fixtures.steps.ts
import { Given } from "@cucumber/cucumber";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { MongoDuplicateKeyFilter } from "@/modules/customer/presentation/http/filters/mongo-duplicate-key.filter";
import { getModelToken } from "@nestjs/mongoose";
import { Customer } from "@/modules/customer/infrastructure/repositories/schemas/customer.schema";
import request from "supertest";

let app: INestApplication;

Given("the following customer already exists", async function (dataTable) {
  // bootstrap Nest app once per scenario
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleRef.createNestApplication();
  app.useGlobalFilters(new MongoDuplicateKeyFilter());
  await app.init();

  // clean collection
  const customerModel = app.get(getModelToken(Customer.name));
  await customerModel.deleteMany({});

  // seed initial customer
  const customer = dataTable.hashes()[0];
  await request(app.getHttpServer())
    .post("/customers")
    .send(customer)
    .expect(201);

  // I store reference in World for later steps
  this.app = app;
  this.seed = customer;
});
