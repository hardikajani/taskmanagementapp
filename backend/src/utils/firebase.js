
  import { initializeApp } from "@firebase/app";
  import { getAuth } from "@firebase/auth";
  import admin from "firebase-admin";


  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  export default auth;

  // Create an admin instance

  const serviceAccount = {
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key" : process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email" : process.env.FIREBASE_CLIENT_EMAIL,
    "client_id" : process.env.FIREBASE_CLIENT_ID,
    "auth_uri" : process.env.FIREBASE_AUTH_URI,
    "token_uri" : process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url" : "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url" : "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-oprc2%40task-management-d2336.iam.gserviceaccount.com",
    "universe_domain" : "googleapis.com"
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  export const firebaseAdmin = admin;