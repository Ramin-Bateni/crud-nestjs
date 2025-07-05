import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get dbHost(): string {
    return this.configService.get<string>('DB_HOST', 'localhost');
  }

  get dbPort(): number {
    return this.configService.get<number>('DB_PORT', 5432);
  }

  get dbUsername(): string {
    return this.configService.get<string>('DB_USERNAME', 'your_username');
  }

  get dbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD', 'your_password');
  }

  get dbDatabase(): string {
    return this.configService.get<string>('DB_DATABASE', 'your_database');
  }

  get dbSync(): boolean {
    return this.configService.get<boolean>('DB_SYNC', true);
  }
}
