import admin from 'firebase-admin';
import configureDb from '../src/lib/db';
import privateKey from './private-key.json';
import testAccounts from './data/test-accounts';

admin.initializeApp({
    credential: admin.credential.cert(privateKey),
    databaseURL: 'https://hermes-dev-1fc82.firebaseio.com',
});
const db = configureDb(admin.database());

// eslint-disable-next-line no-console
db.set('queue', testAccounts).then(() => process.exit(0));
