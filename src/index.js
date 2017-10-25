/* eslint-disable max-lines */
import admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import configureFacebook from './lib/facebook';
import * as domain from './domain/services'; // eslint-disable-line import/no-unresolved, import/extensions
import configureContext from './domain/context';
import configureDb from './lib/db';
import messages from './data/messages';
import configureChannelRouter from './routes/channels';
import configureTriggers from './triggers';
import './pretty-errors';

const config = functions.config();
admin.initializeApp(config.firebase);
const db = configureDb(admin.database());

const fb = configureFacebook(config.facebook);
const context = configureContext({ db });
const getContext = context.get;
const saveContext = context.save;
const enterDomain = { ...messages, ...domain };

const channelRouter =
    configureChannelRouter({ fb, getContext, enterDomain, saveContext });
const triggers = configureTriggers({ db, fb });

// Handle incoming messages
exports.channels = functions.https.onRequest(channelRouter);

exports.gameStarted = functions.database.ref('/games/{id}')
    .onCreate(event => triggers.gameStarted({
        action: 'start',
        game: event.data.val(),
    }));

exports.roundStarted = functions.database.ref('/rounds/{gameId}/{id}')
    .onCreate(event => triggers.roundStarted({
        action: 'round',
        round: event.data.val(),
    }));

exports.votingStarted = functions.database.ref('/candidates/{gameId}/{roundId}')
    .onCreate(event => triggers.voteStarted({
        action: 'round',
        candidates: event.data.val(),
        payload: {
            game: event.params.gameId,
            round: event.params.roundId,
        },
    }));
