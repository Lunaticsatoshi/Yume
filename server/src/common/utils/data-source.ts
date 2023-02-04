
import { DataSource, DataSourceOptions } from "typeorm";

import { config } from '../../config/common';

export const createDataSource = () => {
  const dataSourceOptions = config.database as DataSourceOptions;

  const AppDataSource = new DataSource(dataSourceOptions);

  return AppDataSource;
};