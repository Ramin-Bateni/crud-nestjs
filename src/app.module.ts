import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/infrastructure/module';

@Module({
  imports: [CustomerModule],
})
export class AppModule {}
