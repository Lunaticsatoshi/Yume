import { MigrationInterface, QueryRunner } from "typeorm";

export class ModelsCreated1675707455737 implements MigrationInterface {
    name = 'ModelsCreated1675707455737';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9" UNIQUE ("password")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }
}
