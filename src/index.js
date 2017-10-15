import express from 'express';
import admin from 'firebase-admin';
import transmute from 'transmutation';
import * as functions from 'firebase-functions';
import configureFacebook from './lib/facebook';

const config = functions.config();
const fb = configureFacebook(config.facebook);
admin.initializeApp(config.firebase);

const router = express();
router.post('/facebook', (req, res) => transmute({ raw: req.body })
    .extend('sender', fb.extractSender)
    .extend('action', fb.extractAction)
    .then((results) => {
        console.log(JSON.stringify(results, null, 4));
        res.sendStatus(200);
        fb.sendText(config.facebook.accesstoken, results.sender, results.action);
    })
);
router.get('/facebook', (req, res) => {
    try { fb.verifyToken(req.query); } // eslint-disable-line brace-style
    catch (err) {
        console.error(err); // eslint-disable-line no-console
        return res.sendStatus(403);
    }
    return res.status(200).send(req.query['hub.challenge']);
});


// Handle incoming messages
exports.channels = functions.https.onRequest(router);
