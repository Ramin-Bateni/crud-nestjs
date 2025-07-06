import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1751828899129 implements MigrationInterface {
  name = 'Init1751828899129';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "customer" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "firstName" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                "dateOfBirth" date NOT NULL,
                "phoneNumber" character varying(15) NOT NULL,
                "email" character varying NOT NULL,
                "bankAccountNumber" character varying NOT NULL,
                CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"),
                CONSTRAINT "UQ_b63039ffc6ca8639cdb96828e04" UNIQUE ("firstName", "lastName", "dateOfBirth"),
                CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "customer" DROP COLUMN "phoneNumber"
        `);
    await queryRunner.query(`
            ALTER TABLE "customer"
            ADD "phoneNumber" character varying NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "customer" DROP COLUMN "phoneNumber"
        `);
    await queryRunner.query(`
            ALTER TABLE "customer"
            ADD "phoneNumber" character varying(15) NOT NULL
        `);
    await queryRunner.query(`
            DROP TABLE "customer"
        `);
  }
}
