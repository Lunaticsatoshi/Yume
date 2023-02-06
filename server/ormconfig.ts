import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
    migrationsTableName: 'migrations',
    url: 'postgresql://postgres:postgres@localhost:5432/redditclone',
    password: 'postgres',
    type: 'postgres',
    database: 'postgres',
    logging: false,
    synchronize: false,
    entities: ['dist/entities/*.js'],
    migrations: ['dist/migrations/*.js'],
} as any);