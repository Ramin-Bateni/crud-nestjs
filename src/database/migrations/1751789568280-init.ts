import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1751789568280 implements MigrationInterface {
  name = 'Init1751789568280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "customer" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "firstName" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                "dateOfBirth" TIMESTAMP NOT NULL,
                "phoneNumber" character varying NOT NULL,
                "email" character varying NOT NULL,
                "bankAccountNumber" character varying NOT NULL,
                CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"),
                CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "customer"
        `);
  }
}
