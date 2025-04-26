import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { CustomerOrmEntity } from "src/infrastructure/persistence/entities/customer.typeorm.entity";

export default (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.PSQL_HOST,
    port: process.env.PSQL_PORT? parseInt(process.env.PSQL_PORT): 5431,
    username: process.env.PSQL_USERNAME,
    password: process.env.PSQL_PASSWORD,
    database: process.env.PSQL_DATABASE,
    entities: [CustomerOrmEntity],
    synchronize: process.env.NODE_ENV !== 'production',
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    migrationsRun: true,
  });