
import type { CodegenConfig } from '@graphql-codegen/cli';
const dotenv = require('dotenv');
const path = require('path');

/**
 * Load .env file or for tests the .env.test file.
 */
const dotenvFile = `.env.local`;
dotenv.config({ path: path.join(process.cwd(), dotenvFile) });

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_API_URL,
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/generated/graphql.tsx": {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    }
  }
};

export default config;
