import admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import configureFacebook from './lib/facebook';
import * as domain from './domain/services'; // eslint-disable-line import/no-unresolved, import/extensions
import configureContext from './domain/context';
import configureDb from './lib/db';
import messages from './data/messages';
import configureChannelRouter from './routes/channels';

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

// Handle incoming messages
exports.channels = functions.https.onRequest(channelRouter);
