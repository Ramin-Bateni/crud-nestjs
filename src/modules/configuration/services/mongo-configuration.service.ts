import { Inject, Injectable } from '@nestjs/common';
import { EnvironmentVariables } from '../configuration.schema';

@Injectable()
export class MongoConfigurationService {
  readonly uri: string;
  readonly username: string;
  readonly password: string;
  readonly authSource: string;

  constructor(
    @Inject('ENV_VARS')
    private readonly env: EnvironmentVariables,
  ) {
    this.uri = this.env.MONGO_URI;
    this.username = this.env.MONGO_USER;
    this.password = this.env.MONGO_PASS;
    this.authSource = this.env.MONGO_AUTH_DB;
  }
}
