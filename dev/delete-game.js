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

transmute({
    template: {
        type: 'checkbox',
        name: 'gamesToDelete',
        message: 'Which game should we delete?',
    },
})
    .extend('games', db.get('games'))
    .do(({ games }) => { if (!games) throw new Error('No Games to Delete!'); })
    .extend('choices', ({ games }) => Object.values(games)
        .map(game => ({
            name: game.id,
            value: game.id,
            checked: true,
        }))
    )
    .extend('prompts', ({ template, choices }) => [{ ...template, choices }])
    .extend('answers', ({ prompts }) => prompt(prompts))
    .extend('gamesToDelete', ({ games, answers: { gamesToDelete } }) => gamesToDelete.map(id => games[id]))
    .extend('itemsToDelete', ({ gamesToDelete }) => [].concat(...(gamesToDelete.map(game => [
        `games/${game.id}`,
        `hands/${game.id}`,
        `rounds/${game.id}`,
        ...(Object.values(game.players)
            .map(p => `players/facebook/${p.id}/game`)),
    ]))))
    .do(({ itemsToDelete }) => db.delete(itemsToDelete))
    .then(() => process.exit(0))
    .catch((err) => {
        console.log(err.message);
        process.exit(0);
    });
