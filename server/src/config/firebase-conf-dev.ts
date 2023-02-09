import { getEnvVariable } from '../common/utils/env';

export const firebaseConfig = {
    type: "service_account",
    project_id: "reddit-clone-69",
    private_key_id: getEnvVariable('FIREBASE_PRIVATE_KEY_ID'),
    private_key: getEnvVariable('FIREBASE_PRIVATE_KEY'),
    client_email: "firebase-adminsdk-ra3vh@reddit-clone-69.iam.gserviceaccount.com",
    client_id: "102237882879306488228",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ra3vh%40reddit-clone-69.iam.gserviceaccount.com"
};