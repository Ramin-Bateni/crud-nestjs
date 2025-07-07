import { Module } from '@nestjs/common';
import { AppConfigurationService } from './services/app-configuration.service';
import { validateEnv } from './configuration.schema';
import { DBConfigurationService } from './services/db-configuration.service';
import { MongoConfigurationService } from './services/mongo-configuration.service';

@Module({
  providers: [
    {
      provide: 'ENV_VARS',
      useFactory: () => validateEnv(process.env),
    },
    AppConfigurationService,
    DBConfigurationService,
    MongoConfigurationService,
  ],
  exports: [
    AppConfigurationService,
    DBConfigurationService,
    MongoConfigurationService,
  ],
})
export class ConfigurationModule {}
