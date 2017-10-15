import util from 'util';
import express from 'express';
import admin from 'firebase-admin';
import transmute from 'transmutation';
import * as functions from 'firebase-functions';
import configureFacebook from './lib/facebook';

const config = functions.config();
const fb = configureFacebook(config.facebook);
admin.initializeApp(config.firebase);

const responses = {
    text: 'You are trying to text.',
    start: 'Welcome good sir, thank you for starting.',
    join: 'We set you up in a game.',
    hand: 'Here\'s your hand.',
    pick: 'Good choice.',
    vote: 'We hope you win.',
    unknown: 'No idea what you are doing!',
};
const response = ({ action }) => responses[action] || 'nothing';

const router = express();
router.post('/facebook', (req, res) => transmute({ raw: req.body })
    .extend('sender', fb.extractSender)
    .extend('action', fb.extractAction)
    .extend('message', response)
    // eslint-disable-next-line no-console
    .do(obj => console.log(util.inspect(obj, { showHidden: false, depth: null })))
    .then((results) => {
        res.sendStatus(200);
        fb.sendText(config.facebook.accesstoken, results.sender, results.message);
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
