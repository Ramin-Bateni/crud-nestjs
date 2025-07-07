import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1751838201763 implements MigrationInterface {
  name = 'InitialMigration1751838201763';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(64) NOT NULL, "last_name" character varying(64) NOT NULL, "date_of_birth" timestamp NOT NULL, "phone_number" character varying(13) NOT NULL, "email" character varying(64) NOT NULL, "bank_account_number" character varying(32) NOT NULL, CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "UQ_dc96ed0d670bfb5418ef7fa6821" UNIQUE ("first_name", "last_name", "date_of_birth"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}
