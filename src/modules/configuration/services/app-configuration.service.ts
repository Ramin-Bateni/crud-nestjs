import { Inject, Injectable } from '@nestjs/common';
import { EnvironmentVariables } from '../configuration.schema';

@Injectable()
export class AppConfigurationService {
  readonly port: number;
  constructor(
    @Inject('ENV_VARS')
    private readonly env: EnvironmentVariables,
  ) {
    this.port = this.env.APP_PORT;
  }
}
