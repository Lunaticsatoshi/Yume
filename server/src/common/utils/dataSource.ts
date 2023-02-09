
import { DataSource, DataSourceOptions } from "typeorm";

import { config } from '../../config/common';

export const createDataSource = async () => {
  const dataSourceOptions = config.database as DataSourceOptions;

  const dataSource = new DataSource(dataSourceOptions);

  return await dataSource.initialize();
};