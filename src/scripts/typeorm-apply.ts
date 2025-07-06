#!/usr/bin/env ts-node

/**
 * Usage:
 *   yarn nx run auth:migration-apply
 *
 * Runs all pending migrations.
 */

import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const dataSource = 'src/scripts/typeorm-data-source.ts';
const cli = resolve('node_modules/typeorm/cli.js');

const args = ['migration:run', '-d', dataSource];

// Forward additional args like --transaction=none if provided
if (process.argv.length > 2) {
  args.push(...process.argv.slice(2));
}

const { status } = spawnSync(
  'ts-node',
  ['-P', 'tsconfig.json', '-r', 'tsconfig-paths/register', cli, ...args],
  { stdio: 'inherit' },
);

process.exit(status ?? 0);
