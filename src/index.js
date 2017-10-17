import _ from 'lodash';
import util from 'util';
import express from 'express';
import admin from 'firebase-admin';
import transmute from 'transmutation';
import * as functions from 'firebase-functions';
import configureFacebook from './lib/facebook';
import configureDomain from './domain';
import configureDb from './lib/db';
import messages from './data/messages';

const config = functions.config();
admin.initializeApp(config.firebase);
const db = configureDb(admin.database());

const fb = configureFacebook(config.facebook);
const configuredDomain = configureDomain({ db });

const domain = _.extend(messages, configuredDomain);

const router = express();
router.post('/facebook', (req, res) => transmute({ raw: req.body })
    .extend('lead', fb.extractLead)
    .extend('action', fb.extractAction)
    .extend(results => domain[results.action](results))
    .extend('facebookMessages', fb.transform)
    // eslint-disable-next-line no-console
    .do(obj => console.log(util.inspect(obj, { showHidden: false, depth: null })))
    .then(({ lead: { id }, facebookMessages }) => {
        res.sendStatus(200);
        fb.sendMessage(id, facebookMessages);
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
