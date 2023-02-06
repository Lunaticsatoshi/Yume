import { MigrationInterface, QueryRunner } from "typeorm";

export class ModelsCreated1675695950797 implements MigrationInterface {
    name = 'ModelsCreated1675695950797';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "communities" ("invoiceFieldKey" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "imageUrn" character varying, "bannerUrn" character varying, "username" character varying NOT NULL, CONSTRAINT "UQ_501bb6c8f7c8e8a7d614d9435f6" UNIQUE ("name"), CONSTRAINT "PK_59133df6e0d3a2710da7e3ec77f" PRIMARY KEY ("invoiceFieldKey"))`);
        await queryRunner.query(`CREATE INDEX "IDX_501bb6c8f7c8e8a7d614d9435f" ON "communities" ("name") `);
        await queryRunner.query(`CREATE TYPE "public"."votes_votetype_enum" AS ENUM('UPVOTE', 'DOWNVOTE')`);
        await queryRunner.query(`CREATE TABLE "votes" ("invoiceFieldKey" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "voteType" "public"."votes_votetype_enum" NOT NULL DEFAULT 'UPVOTE', "username" character varying NOT NULL, "postInvoiceFieldKey" integer, "commentInvoiceFieldKey" integer, CONSTRAINT "PK_c2244b080d09d73da77c1f2decc" PRIMARY KEY ("invoiceFieldKey"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("invoiceFieldKey" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "identifier" character varying NOT NULL, "body" character varying NOT NULL, "username" character varying NOT NULL, "postInvoiceFieldKey" integer NOT NULL, CONSTRAINT "PK_a29343faa4796b915cd51cfa693" PRIMARY KEY ("invoiceFieldKey"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8e7297165a3d53fa13b720bb11" ON "comments" ("identifier") `);
        await queryRunner.query(`CREATE TABLE "posts" ("invoiceFieldKey" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "identifier" character varying NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "body" text, "communityName" character varying NOT NULL, "username" character varying NOT NULL, "voteCount" integer NOT NULL, "commentCount" integer NOT NULL, CONSTRAINT "PK_012484fbef4357ab0981307b5a4" PRIMARY KEY ("invoiceFieldKey"))`);
        await queryRunner.query(`CREATE INDEX "IDX_152316363d20c399f934c4f74b" ON "posts" ("identifier") `);
        await queryRunner.query(`CREATE INDEX "IDX_54ddf9075260407dcfdd724857" ON "posts" ("slug") `);
        await queryRunner.query(`CREATE TABLE "users" ("invoiceFieldKey" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "profilePicUrn" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "isVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_8bf09ba754322ab9c22a215c919" UNIQUE ("userId"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_7fd09bfd3af8e50669216c1d62d" PRIMARY KEY ("invoiceFieldKey"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8bf09ba754322ab9c22a215c91" ON "users" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `);
        await queryRunner.query(`ALTER TABLE "communities" ADD CONSTRAINT "FK_6b1e067767d11fdfa0d5d3edea4" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_79326ff26ef790424d820d54a72" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_99f9dd2259e2fce40330a0f0fd5" FOREIGN KEY ("postInvoiceFieldKey") REFERENCES "posts"("invoiceFieldKey") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_8c39865e6de3b74697bfdfe0c07" FOREIGN KEY ("commentInvoiceFieldKey") REFERENCES "comments"("invoiceFieldKey") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_5d9144e84650ce78f40737e284e" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_b17e186eec8f566c781d32e5e88" FOREIGN KEY ("postInvoiceFieldKey") REFERENCES "posts"("invoiceFieldKey") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_42377e3f89a203ca74d117e5961" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_7eaa8a7394e8bf4849d8f31d74a" FOREIGN KEY ("communityName") REFERENCES "communities"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_7eaa8a7394e8bf4849d8f31d74a"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_42377e3f89a203ca74d117e5961"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_b17e186eec8f566c781d32e5e88"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_5d9144e84650ce78f40737e284e"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_8c39865e6de3b74697bfdfe0c07"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_99f9dd2259e2fce40330a0f0fd5"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_79326ff26ef790424d820d54a72"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP CONSTRAINT "FK_6b1e067767d11fdfa0d5d3edea4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe0bb3f6520ee0469504521e71"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8bf09ba754322ab9c22a215c91"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_54ddf9075260407dcfdd724857"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_152316363d20c399f934c4f74b"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e7297165a3d53fa13b720bb11"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "votes"`);
        await queryRunner.query(`DROP TYPE "public"."votes_votetype_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_501bb6c8f7c8e8a7d614d9435f"`);
        await queryRunner.query(`DROP TABLE "communities"`);
    }
}
