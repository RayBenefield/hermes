/* eslint-disable max-lines */
import _ from 'lodash';
import admin from 'firebase-admin';
import transmute from 'transmutation';
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

const hand = [
    { contents: 'Being a motherfucking sorcerer.' },
    { contents: 'Winking at old people.' },
    { contents: 'THE KOOL-AID MAN.' },
    { contents: 'Hurricane Katrina.' },
    { contents: 'Powerful thighs.' },
    { contents: 'Vigorous jazz hands.' },
    { contents: 'BEES?' },
    { contents: 'Morgan Freeman\'s voice.' },
    { contents: 'Racism.' },
    { contents: 'Daddy issues.' },
];

exports.gameStarted = functions.database.ref('/games/{id}')
    .onCreate(event => transmute({
        game: { id: event.params.id },
        action: 'start',
        payload: event.data.val(),
    })
        .extend('messages', ({ payload }) => [
            {
                type: 'game-started-message',
                payload,
            },
        ])
        .extend('leads', ({ payload: { players, notified_players: notified } }) =>
            _.values(players).filter(({ id }) => !(id in notified)))
        .do(({ leads, messages: rawMessages }) => Promise.all(
            leads.map((lead) => {
                const facebookMessages = fb.transform({ lead, messages: rawMessages });
                return fb.sendMessages(lead.id, facebookMessages);
            })))
        .do(({ game, payload: { players } }) =>
            db.set(`games/${game.id}/notified_players`, players))
        .do(({ game, payload: { players } }) => Promise.all(_.values(players)
            .map(p => db.set(`hands/${game.id}/${p.id}`, hand))))
    );
