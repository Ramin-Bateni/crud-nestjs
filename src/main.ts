import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
