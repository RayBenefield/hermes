import transmute from 'transmutation';
import { prompt } from 'inquirer';
import admin from 'firebase-admin';
import configureDb from '../src/lib/db';
import privateKey from './private-key.json';
import { setupEntities } from '../src/domain';

admin.initializeApp({
    credential: admin.credential.cert(privateKey),
    databaseURL: 'https://hermes-dev-1fc82.firebaseio.com',
});
const db = configureDb(admin.database());
const { get, save } = setupEntities({ db });
const testAccounts = ['1969918279691174', '2062932073720600', '1654450144625528', '1572553382787981'];

const getChoices = ['choices', ({ players }) => players
    .map(player => ({
        name: `${player.first_name} ${player.last_name}`,
        value: player.id,
        short: player.first_name,
        checked: testAccounts.includes(player.id),
    }))];
const getPrompts = ['prompts', ({ template, choices }) => [{ ...template, choices }]];
const getAnswers = ['answers', ({ prompts }) => prompt(prompts)];
const getQueue = ['queue', ({ players, answers: { queue } }) => players
    .filter(p => queue.includes(p.id))
    .map(p => p.id)];

transmute({
    template: {
        type: 'checkbox',
        name: 'queue',
        message: 'Which players should we add to the queue?',
    },
})
    .extend(...get.allPlayers)
    .extend(...getChoices)
    .extend(...getPrompts)
    .extend(...getAnswers)
    .extend(...getQueue)
    .do(...save.queue)
    .then(() => process.exit(0));
