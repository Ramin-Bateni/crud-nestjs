#!/usr/bin/env ts-node

/**
 * Usage:
 *   yarn nx run auth:migration-generate -- MyCoolMigration
 *
 * The script prepends the fixed migrations directory and
 * calls the TypeORM CLI with the correct arguments.
 */

import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const migrationName = process.argv[2];
if (!migrationName) {
  console.error(
    '❌  Please supply a migration class name.\n   Example:  yarn migration-generate:auth -- AddUsers',
  );
  process.exit(1);
}

const migrationsDir = 'src/database/migrations';
const dataSource = 'src/scripts/typeorm-data-source.ts';

const cli = resolve('node_modules/typeorm/cli.js');

const args = [
  'migration:generate',
  '-d',
  dataSource,
  join(migrationsDir, migrationName),
];

// ts-node already running (shebang), so just spawn the CLI
const { status } = spawnSync(
  'ts-node',
  ['-P', 'tsconfig.json', '-r', 'tsconfig-paths/register', cli, ...args],
  { stdio: 'inherit' },
);

process.exit(status ?? 0);
