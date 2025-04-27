import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
    @IsString()
    APP_PORT: string;

    @IsString()
    PSQL_NAME: string;

    @IsString()
    PSQL_TYPE: string;

    @IsString()
    PSQL_HOST: string;

    @IsString()
    PSQL_PORT: number;

    @IsString()
    PSQL_USERNAME: string;

    @IsString()
    PSQL_PASSWORD: string;

    @IsString()
    PSQL_DATABASE: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config);
  const errors = validateSync(validatedConfig);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}