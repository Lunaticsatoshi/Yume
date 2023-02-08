import { MigrationInterface, QueryRunner } from "typeorm";

export class ModelsCreated1675845710133 implements MigrationInterface {
    name = 'ModelsCreated1675845710133';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "communities" DROP CONSTRAINT "FK_6b1e067767d11fdfa0d5d3edea4"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_ac7559e71fbb7caf9d9d5f38f37"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_3c785ec557249db94d288a5d293"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP CONSTRAINT "FK_250d3303fef1c1f9bc4804b24ac"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_839756572a2c38eb5a3b563126e"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_107dda648a1003b160af10ed47d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac7559e71fbb7caf9d9d5f38f3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c785ec557249db94d288a5d29"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "PK_72072359256a1653e6ccb104029"`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "PK_3c785ec557249db94d288a5d293" PRIMARY KEY ("usersId")`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "communitiesId"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "PK_3c785ec557249db94d288a5d293"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "communityType"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "memberType"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "UQ_839756572a2c38eb5a3b563126e"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "UQ_107dda648a1003b160af10ed47d"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "communityName"`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "communityType" character varying NOT NULL DEFAULT 'PUBLIC'`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "members" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "members" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "members" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "members" ADD "memberType" character varying NOT NULL DEFAULT 'MEMBER'`);
        await queryRunner.query(`ALTER TABLE "members" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "UQ_839756572a2c38eb5a3b563126e" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "members" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "members" ADD "communityName" character varying`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "UQ_107dda648a1003b160af10ed47d" UNIQUE ("communityName")`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "members" ADD "communitiesId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "PK_28b53062261b996d9c99fa12404"`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "PK_5376b717cc2a2ba5cd11d11fdea" PRIMARY KEY ("id", "communitiesId")`);
        await queryRunner.query(`ALTER TABLE "members" ADD "usersId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "PK_5376b717cc2a2ba5cd11d11fdea"`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "PK_e6429054255575437333c2fcfac" PRIMARY KEY ("id", "communitiesId", "usersId")`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "PK_e6429054255575437333c2fcfac"`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "PK_72072359256a1653e6ccb104029" PRIMARY KEY ("communitiesId", "usersId")`);
        await queryRunner.query(`CREATE INDEX "IDX_ac7559e71fbb7caf9d9d5f38f3" ON "members" ("communitiesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3c785ec557249db94d288a5d29" ON "members" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "communities" ADD CONSTRAINT "FK_250d3303fef1c1f9bc4804b24ac" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_839756572a2c38eb5a3b563126e" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_107dda648a1003b160af10ed47d" FOREIGN KEY ("communityName") REFERENCES "communities"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "communities" ADD CONSTRAINT "FK_6b1e067767d11fdfa0d5d3edea4" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_ac7559e71fbb7caf9d9d5f38f37" FOREIGN KEY ("communitiesId") REFERENCES "communities"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_3c785ec557249db94d288a5d293" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_3c785ec557249db94d288a5d293"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_ac7559e71fbb7caf9d9d5f38f37"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP CONSTRAINT "FK_6b1e067767d11fdfa0d5d3edea4"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_107dda648a1003b160af10ed47d"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_839756572a2c38eb5a3b563126e"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP CONSTRAINT "FK_250d3303fef1c1f9bc4804b24ac"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c785ec557249db94d288a5d29"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac7559e71fbb7caf9d9d5f38f3"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "PK_72072359256a1653e6ccb104029"`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "PK_e6429054255575437333c2fcfac" PRIMARY KEY ("id", "communitiesId", "usersId")`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "PK_e6429054255575437333c2fcfac"`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "PK_5376b717cc2a2ba5cd11d11fdea" PRIMARY KEY ("id", "communitiesId")`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "PK_5376b717cc2a2ba5cd11d11fdea"`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "communitiesId"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "UQ_107dda648a1003b160af10ed47d"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "communityName"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "UQ_839756572a2c38eb5a3b563126e"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "memberType"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "PK_28b53062261b996d9c99fa12404"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "communities" DROP COLUMN "communityType"`);
        await queryRunner.query(`ALTER TABLE "members" ADD "communityName" character varying`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "UQ_107dda648a1003b160af10ed47d" UNIQUE ("communityName")`);
        await queryRunner.query(`ALTER TABLE "members" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "members" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "UQ_839756572a2c38eb5a3b563126e" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "members" ADD "memberType" character varying NOT NULL DEFAULT 'MEMBER'`);
        await queryRunner.query(`ALTER TABLE "members" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "members" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "members" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "communityType" character varying NOT NULL DEFAULT 'PUBLIC'`);
        await queryRunner.query(`ALTER TABLE "members" ADD "usersId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "PK_3c785ec557249db94d288a5d293" PRIMARY KEY ("usersId")`);
        await queryRunner.query(`ALTER TABLE "members" ADD "communitiesId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "PK_3c785ec557249db94d288a5d293"`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "PK_72072359256a1653e6ccb104029" PRIMARY KEY ("communitiesId", "usersId")`);
        await queryRunner.query(`ALTER TABLE "communities" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_3c785ec557249db94d288a5d29" ON "members" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac7559e71fbb7caf9d9d5f38f3" ON "members" ("communitiesId") `);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_107dda648a1003b160af10ed47d" FOREIGN KEY ("communityName") REFERENCES "communities"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_839756572a2c38eb5a3b563126e" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "communities" ADD CONSTRAINT "FK_250d3303fef1c1f9bc4804b24ac" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_3c785ec557249db94d288a5d293" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_ac7559e71fbb7caf9d9d5f38f37" FOREIGN KEY ("communitiesId") REFERENCES "communities"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "communities" ADD CONSTRAINT "FK_6b1e067767d11fdfa0d5d3edea4" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}