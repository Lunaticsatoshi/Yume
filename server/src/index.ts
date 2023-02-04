import { config } from 'dotenv';
config();

import app from './app';

const PORT: string | number = process.env.PORT || 5000;
const ENV: string | number = process.env.NODE_ENV || 'development';

(() => {
  app.listen(PORT, () =>
    console.log(`Server started on port ${PORT} in ${ENV} mode`),
  );
})();
