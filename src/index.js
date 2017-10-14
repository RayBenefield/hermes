import * as functions from 'firebase-functions';
import admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

exports.hello = functions.https.onRequest((req, res) => res.send(200));
