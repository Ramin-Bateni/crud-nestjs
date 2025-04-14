import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

console.log(
  '\x1b[36m%s\x1b[0m',
  `
 ██████ ██████  ██    ██ ██████      ████████ ███████ ███████ ████████     ███    ██ ███████ ███████ ████████      ██ ███████ 
██      ██   ██ ██    ██ ██   ██        ██    ██      ██         ██        ████   ██ ██      ██         ██         ██ ██      
██      ██████  ██    ██ ██   ██        ██    █████   ███████    ██        ██ ██  ██ █████   ███████    ██         ██ ███████ 
██      ██   ██ ██    ██ ██   ██        ██    ██           ██    ██        ██  ██ ██ ██           ██    ██    ██   ██      ██ 
 ██████ ██   ██  ██████  ██████         ██    ███████ ███████    ██        ██   ████ ███████ ███████    ██     █████  ███████ 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  `
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable validation pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE || 'NestJS CRUD API')
    .setDescription(process.env.SWAGGER_DESCRIPTION || 'The NestJS CRUD API documentation')
    .setVersion(process.env.SWAGGER_VERSION || '1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_PATH || 'api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation is available at: http://localhost:${port}/${process.env.SWAGGER_PATH || 'api/docs'}`);
}
bootstrap();
