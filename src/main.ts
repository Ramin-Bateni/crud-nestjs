// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { MongoDuplicateKeyFilter } from "./modules/customer/presentation/http/filters/mongo-duplicate-key.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // To convert duplicate error in mongo to 409
  app.useGlobalFilters(new MongoDuplicateKeyFilter());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
  );

  // Swagger setup -------------------------------

  const config = new DocumentBuilder()
    .setTitle("Customer API")
    .setDescription("Customer CRUD API")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);

  // ---------------------------------------------

  await app.listen(3000);
}
bootstrap();
