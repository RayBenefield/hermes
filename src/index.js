/* eslint-disable max-lines */
import admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import flame from '@leonardvandriel/flame';
import configureFacebook from './lib/facebook';
import configureDomain from './domain';
import configureFlame from './lib/local-db';
import configureFirebaseDb from './lib/db';
import configureChannelRouter from './routes/channels';
import configureTriggers from './triggers';
import './pretty-errors';

const config = functions.config();
admin.initializeApp(config.firebase);
const db = process.env.NODE_ENV === 'dev-local'
    ? configureFlame(flame)
    : configureFirebaseDb(admin.database());

const fb = configureFacebook(config.facebook);
const domain = configureDomain({ db });

const channelRouter =
    configureChannelRouter({ fb, domain });
const triggers = configureTriggers({ db, fb, domain });

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
        action: 'candidates',
        payload: {
            game: event.params.gameId,
            round: event.params.roundId,
            notified: event.data.val().notified_players,
        },
    }));

exports.winnerDecided = functions.database.ref('/rounds/{gameId}/{roundId}/winner')
    .onCreate(event => triggers.winnerDecided({
        action: 'winner',
        payload: {
            game: event.params.gameId,
            round: event.params.roundId,
            winner: event.data.val(),
        },
    }));
