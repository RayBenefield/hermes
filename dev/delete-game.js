import transmute from 'transmutation';
import { prompt } from 'inquirer';
import admin from 'firebase-admin';
import configureDb from '../src/lib/db';
import privateKey from './private-key.json';
import configureEntities from '../src/domain/entities';

admin.initializeApp({
    credential: admin.credential.cert(privateKey),
    databaseURL: 'https://hermes-dev-1fc82.firebaseio.com',
});
const db = configureDb(admin.database());
const { get, save } = configureEntities({ db });

const getGameChoices = ['choices', ({ games }) => games
    .map(game => ({
        name: game.id,
        value: game.id,
        checked: true,
    }))];
const getPrompts = ['prompts', ({ template, choices }) => [{ ...template, choices }]];
const getAnswers = ['answers', ({ prompts }) => prompt(prompts)];
const getGamesToDelete = ['gamesToDelete', ({ games, answers: { gamesToDelete } }) =>
    games.filter(g => gamesToDelete.includes(g.id))];

transmute({
    template: {
        type: 'checkbox',
        name: 'gamesToDelete',
        message: 'Which game should we delete?',
    },
})
    .extend(...get.allGames)
    .do(({ games }) => { if (!games) throw new Error('No Games to Delete!'); })
    .extend(...getGameChoices)
    .extend(...getPrompts)
    .extend(...getAnswers)
    .extend(...getGamesToDelete)
    .do(({ gamesToDelete }) => Promise.all(
        gamesToDelete.map(game => save.deletedGame[0]({ game }))))
    .then(() => process.exit(0))
    .catch((err) => {
        console.log(err.message);
        process.exit(0);
    });
