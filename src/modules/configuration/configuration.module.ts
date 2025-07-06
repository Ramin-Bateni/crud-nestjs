import { Module } from '@nestjs/common';
import { AppConfigurationService } from './services/app-configuration.service';
import { validateEnv } from './configuration.schema';
import { DBConfigurationService } from './services/db-configuration.service';

@Module({
  providers: [
    {
      provide: 'ENV_VARS',
      useFactory: () => validateEnv(process.env),
    },
    AppConfigurationService,
    DBConfigurationService,
  ],
  exports: [AppConfigurationService, DBConfigurationService],
})
export class ConfigurationModule {}
