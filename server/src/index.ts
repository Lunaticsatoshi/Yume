import { config } from 'dotenv';
config();

import { createDataSource } from './config/data-source';
import app from './app';

const PORT: string | number = process.env.PORT || 5000;
const ENV: string | number = process.env.NODE_ENV || 'development';

(async () => {
  console.log("Connecting to Postgress.....");
  try {
    await createDataSource();

    // console.log("connected, running migrations now", dataSource);
    // await dataSource.runMigrations();
    // console.log("migrations ran");
  } catch (error) {
    console.log("error", error);
  }
  app.listen(PORT, () =>
    console.log(`server started on port ${PORT} in ${ENV} mode`),
  );
})();
