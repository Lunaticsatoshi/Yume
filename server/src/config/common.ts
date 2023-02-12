import { __prod__ } from '../constants';
import { getEnvVariable } from '../common/utils/env';

export const config = {
  appName: 'Reddit',
  database: {
    type: 'postgres',
    url: getEnvVariable('DATABASE_URL'),
    password: getEnvVariable('DATABASE_PASSWORD'),
    // url: __prod__ ? process.env.DATABASE_URL : undefined,
    entities: ['dist/entities/*.js'],
    migrations: ['dist/migrations/*.js'],
    synchronize: !__prod__,
    logging: __prod__ ? ["query", "error"] : "all",
  },
};
