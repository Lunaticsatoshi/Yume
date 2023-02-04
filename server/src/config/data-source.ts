
import { DataSource, DataSourceOptions } from "typeorm";
import { __prod__ } from "../constants";

export const createDataSource = () => {
  const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    // url: __prod__ ? process.env.DATABASE_URL : undefined,
    entities: ["dist/entities/*.js"],
    migrations: ["dist/migrations/*.js"],
    synchronize: !__prod__,
    logging: !__prod__,
  };

  const AppDataSource = new DataSource(dataSourceOptions);

  return AppDataSource;
};