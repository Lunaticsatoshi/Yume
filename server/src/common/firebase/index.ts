import * as admin from 'firebase-admin';

import { firebaseConfig } from '../../config/firebase-conf-dev';

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: firebaseConfig.private_key,
    clientEmail: firebaseConfig.client_email,
    projectId: firebaseConfig.project_id,
  }),
});

export default admin;