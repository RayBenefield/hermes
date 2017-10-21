import _ from 'lodash';
import express from 'express';
import admin from 'firebase-admin';
import transmute from 'transmutation';
import * as functions from 'firebase-functions';
import configureFacebook from './lib/facebook';
import * as domain from './domain'; // eslint-disable-line import/no-unresolved, import/extensions
import configureContext from './context';
import configureDb from './lib/db';
import messages from './data/messages';
import { logAll } from './lib/utils';

const config = functions.config();
admin.initializeApp(config.firebase);
const db = configureDb(admin.database());

const fb = configureFacebook(config.facebook);
const context = configureContext({ db });
const getContext = context.get;
const saveContext = context.save;
const enterDomain = _.extend(messages, domain);

const router = express();
router.post('/facebook', (req, res) => transmute({ raw: req.body })
    .do(() => res.sendStatus(200))
    .extend('lead', fb.extractLead)
    .extend(fb.extractActionWithPayload)
    .switch('action', {
        login: transmute().extend('lead', fb.enrichLead),
    })
    .switch('action', getContext)
    .extend('messages', transmute()
        .switch('action', enterDomain))
    .do(stream => Promise.all(
        stream.messages.map(msg =>
            transmute(msg).switch('type', saveContext))
    ))
    .extend('facebookMessages', fb.transform)
    // eslint-disable-next-line no-console
    .do(logAll)
    .then(({ lead: { id }, facebookMessages }) =>
        fb.sendMessages(id, facebookMessages))
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
