import { MigrationInterface, QueryRunner } from "typeorm";

export class ModelsCreated1675785540423 implements MigrationInterface {
    name = 'ModelsCreated1675785540423';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "identifier" character varying NOT NULL, "body" character varying NOT NULL, "username" character varying NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8e7297165a3d53fa13b720bb11" ON "comments" ("identifier") `);
        await queryRunner.query(`CREATE TYPE "public"."votes_votetype_enum" AS ENUM('UPVOTE', 'DOWNVOTE')`);
        await queryRunner.query(`CREATE TABLE "votes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "voteType" "public"."votes_votetype_enum" NOT NULL DEFAULT 'UPVOTE', "username" character varying NOT NULL, "postId" integer, "commentId" integer, CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_authtype_enum" AS ENUM('EMAIL_AND_PASSWORD', 'GOOGLE')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying, "authType" "public"."users_authtype_enum" NOT NULL DEFAULT 'EMAIL_AND_PASSWORD', "profilePicUrn" character varying, "isActive" boolean NOT NULL DEFAULT false, "isVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_8bf09ba754322ab9c22a215c919" UNIQUE ("userId"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8bf09ba754322ab9c22a215c91" ON "users" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `);
        await queryRunner.query(`CREATE TABLE "communities" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "imageUrn" character varying, "bannerUrn" character varying, "username" character varying NOT NULL, CONSTRAINT "UQ_501bb6c8f7c8e8a7d614d9435f6" UNIQUE ("name"), CONSTRAINT "PK_fea1fe83c86ccde9d0a089e7ea2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_501bb6c8f7c8e8a7d614d9435f" ON "communities" ("name") `);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "identifier" character varying NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "body" text, "communityName" character varying NOT NULL, "imageUrn" character varying, "username" character varying NOT NULL, "voteCount" integer NOT NULL DEFAULT '0', "commentCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_152316363d20c399f934c4f74b" ON "posts" ("identifier") `);
        await queryRunner.query(`CREATE INDEX "IDX_54ddf9075260407dcfdd724857" ON "posts" ("slug") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_5d9144e84650ce78f40737e284e" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_79326ff26ef790424d820d54a72" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_b5b05adc89dda0614276a13a599" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_554879cbc33538bf15d6991f400" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "communities" ADD CONSTRAINT "FK_6b1e067767d11fdfa0d5d3edea4" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_42377e3f89a203ca74d117e5961" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_7eaa8a7394e8bf4849d8f31d74a" FOREIGN KEY ("communityName") REFERENCES "communities"("name") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_7eaa8a7394e8bf4849d8f31d74a"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_42377e3f89a203ca74d117e5961"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP CONSTRAINT "FK_6b1e067767d11fdfa0d5d3edea4"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_554879cbc33538bf15d6991f400"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_b5b05adc89dda0614276a13a599"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_79326ff26ef790424d820d54a72"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_5d9144e84650ce78f40737e284e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_54ddf9075260407dcfdd724857"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_152316363d20c399f934c4f74b"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_501bb6c8f7c8e8a7d614d9435f"`);
        await queryRunner.query(`DROP TABLE "communities"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe0bb3f6520ee0469504521e71"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8bf09ba754322ab9c22a215c91"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_authtype_enum"`);
        await queryRunner.query(`DROP TABLE "votes"`);
        await queryRunner.query(`DROP TYPE "public"."votes_votetype_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e7297165a3d53fa13b720bb11"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }
}
