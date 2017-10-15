import util from 'util';
import express from 'express';
import admin from 'firebase-admin';
import transmute from 'transmutation';
import * as functions from 'firebase-functions';
import configureFacebook from './lib/facebook';
import messages from './data/messages';

const config = functions.config();
const fb = configureFacebook(config.facebook);
admin.initializeApp(config.firebase);

const domain = ({ action }) => messages[action] || 'nothing';

const router = express();
router.post('/facebook', (req, res) => transmute({ raw: req.body })
    .extend('sender', fb.extractSender)
    .extend('action', fb.extractAction)
    .extend('messages', domain)
    .extend('facebookMessages', fb.transform)
    // eslint-disable-next-line no-console
    .do(obj => console.log(util.inspect(obj, { showHidden: false, depth: null })))
    .then(({ sender, facebookMessages }) => {
        res.sendStatus(200);
        fb.sendMessage(sender, facebookMessages);
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
