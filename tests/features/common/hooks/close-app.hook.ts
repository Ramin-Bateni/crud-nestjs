import { INestApplication } from "@nestjs/common";
import { AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { CustomWorld } from "../../../support/custom-world";
import { AppModule } from "@/app.module";
import { Test } from "@nestjs/testing";
import { MongoDuplicateKeyFilter } from "@/modules/customer/presentation/http/filters/mongo-duplicate-key.filter";

let globalApp: INestApplication;

BeforeAll(async function (this: CustomWorld) {
  // Build the Nest app one time for seeding -----------------------------
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  globalApp = moduleRef.createNestApplication();

  // To convert duplicate error received from DB to HTTP 409 error
  globalApp.useGlobalFilters(new MongoDuplicateKeyFilter());

  await globalApp.init();
});

Before(function (this: CustomWorld) {
  // I give each scenario’s World access to the shared Nest application here (before each scenario)
  this.app = globalApp;
});

AfterAll(async function () {
  // teardown
  if (globalApp) {
    try {
      await globalApp.close();
    } catch (e) {
      // ignore mongoose client already closed error
    }
  }
});
