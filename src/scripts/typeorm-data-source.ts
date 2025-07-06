import * as path from 'node:path';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { validateEnv } from '../modules/configuration/configuration.schema';
import { DBConfigurationService } from '../modules/configuration/services/db-configuration.service';

function getDataSource(): DataSource {
  const envVariables = validateEnv(process.env);
  const config = new DBConfigurationService(envVariables);

  const dataSource = new DataSource({
    type: 'postgres',
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.db,
    logging: false,
    synchronize: false,
    schema: 'public',
    entities: [path.join(__dirname, '../**/*.entity.{js,ts}')],
    migrations: [
      path.join(__dirname, '../database/migrations/*.{ts,js}'),
      path.join(__dirname, '../database/seeders/*.{ts,js}'),
    ],
    migrationsTransactionMode: 'each',
    namingStrategy: new SnakeNamingStrategy(),
  });

  return dataSource;
}

export default getDataSource();
