import admin from 'firebase-admin'
import serviceAccount from './codepen-688f2-firebase-adminsdk-ruxk1-860fa40601.json' assert { type: 'json' };


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://codepen-688f2.appspot.com'
});

const bucket = admin.storage().bucket();

export default bucket;