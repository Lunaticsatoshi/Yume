import { config } from 'dotenv';
config();

import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createDataSource } from './common/utils/data-source';
import app from './app';
import { UserResolver } from './modules/user/user-resolver';

const PORT: string | number = process.env.PORT || 5000;
const ENV: string | number = process.env.NODE_ENV || 'development';

(async () => {
  console.log("Connecting to Postgress.....");
  try {
    const dataSource = await createDataSource();

    await dataSource.initialize();
    await dataSource.synchronize();
    // await dataSource.runMigrations();
    if(dataSource.isInitialized) {
      console.log("connected to database");
    }

    // console.log("connected, running migrations now", dataSource);
    // await dataSource.runMigrations();
    // console.log("migrations ran");
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver],
        validate: false,
      }),
      context: ({ req, res }) => ({
        req,
        res,
      }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
      app,
      cors: false,
    });

    app.listen(PORT, () =>
      console.log(`server started on port ${PORT} in ${ENV} mode`),
    );
  } catch (error) {
    console.log("error", error.message);
  }
})();
