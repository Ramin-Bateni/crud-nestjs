import { Inject, Injectable } from '@nestjs/common';
import { EnvironmentVariables } from '../configuration.schema';

@Injectable()
export class DBConfigurationService {
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly db: string;

  constructor(
    @Inject('ENV_VARS')
    private readonly env: EnvironmentVariables,
  ) {
    this.host = this.env.DB_HOST;
    this.port = this.env.DB_PORT;
    this.username = this.env.DB_USER;
    this.password = this.env.DB_PASS;
    this.db = this.env.DB_NAME;
  }
}
