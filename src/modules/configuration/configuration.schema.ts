import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';
import * as dotenv from 'dotenv';

dotenv.config();

export class EnvironmentVariables {
  @IsNumber()
  @Min(1024)
  @Max(65535)
  APP_PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsNumber()
  @Min(1024)
  @Max(65535)
  DB_PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_USER: string;

  @IsString()
  @IsNotEmpty()
  DB_PASS: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;
}

export function validateEnv(env: NodeJS.ProcessEnv): EnvironmentVariables {
  const config = plainToInstance(EnvironmentVariables, {
    APP_PORT: Number.parseInt(env.APP_PORT || '3000'),
    DATABASE_URL: env.DATABASE_URL,
    DB_HOST: env.DB_HOST,
    DB_PORT: Number.parseInt(env.DB_PORT || '5432'),
    DB_USER: env.DB_USER,
    DB_PASS: env.DB_PASS,
    DB_NAME: env.DB_NAME,
  });

  const errors = validateSync(config, {
    skipMissingProperties: false,
    forbidUnknownValues: true,
  });

  if (errors.length > 0) {
    throw new Error(`Config validation failed: ${JSON.stringify(errors)}`);
  }

  return config;
}
