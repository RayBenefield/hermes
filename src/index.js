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
        game: { id: event.params.id },
        action: 'start',
        payload: event.data.val(),
    }));

exports.roundStarted = functions.database.ref('/rounds/{gameId}/{id}')
    .onCreate(event => triggers.roundStarted({
        round: { id: event.params.id },
        game: { id: event.params.gameId },
    }));
