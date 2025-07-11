import { INestApplication } from "@nestjs/common";
import { AfterAll, Before } from "@cucumber/cucumber";
import { CustomWorld } from "../../../support/custom-world";

let sharedApp: INestApplication | undefined;

Before(function () {
  sharedApp = this.app;
});

AfterAll(async () => {
  if (sharedApp) await sharedApp.close();
});
