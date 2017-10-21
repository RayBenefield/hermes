import transmute from 'transmutation';
import { prompt } from 'inquirer';
import admin from 'firebase-admin';
import configureDb from '../src/lib/db';
import privateKey from './private-key.json';

admin.initializeApp({
    credential: admin.credential.cert(privateKey),
    databaseURL: 'https://hermes-dev-1fc82.firebaseio.com',
});
const db = configureDb(admin.database());
const testAccounts = ['1969918279691174', '2062932073720600', '1654450144625528', '1572553382787981'];

transmute({
    template: {
        type: 'checkbox',
        name: 'queue',
        message: 'Which players should we add to the queue?',
    },
})
    .extend('players', db.get('players/facebook'))
    .extend('choices', ({ players }) => Object.values(players)
        .map(player => ({
            name: `${player.first_name} ${player.last_name}`,
            value: player.id,
            short: player.first_name,
            checked: testAccounts.includes(player.id),
        }))
    )
    .extend('prompts', ({ template, choices }) => [{ ...template, choices }])
    .extend('answers', ({ prompts }) => prompt(prompts))
    .extend('playersToAdd', ({ players, answers: { queue } }) => queue.map(p => players[p]))
    .extend('queue', ({ playersToAdd }) => playersToAdd
        .reduce((queue, player) => Object.assign(queue, { [player.id]: player }), {}))
    .do(({ queue }) => db.set('queue', queue))
    .then(() => process.exit(0));
