import _ from 'lodash';
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
const testAccounts = ['1969918279691174', '2062932073720600', '1654450144625528', '1572553382787981'];
const { get, save } = configureEntities({ db });

const getChoices = ['choices', ({ rounds }) => rounds
    .map(round => ({
        name: round.card.contents,
        value: round.id,
    }))];
const getPrompts = ['prompts', ({ template, choices }) => [{ ...template, choices }]];
const getAnswers = ['answers', ({ prompts }) => prompt(prompts)];
const getRound = ['round', ({ rounds, answers: { roundToPopulate } }) =>
    rounds.find(r => r.id === roundToPopulate)];
const getPlayerChoices = ['playerChoices', ({ game }) => Object.values(game.players)
    .map(player => ({
        name: `${player.first_name} ${player.last_name}`,
        value: player.id,
        short: player.first_name,
        checked: testAccounts.includes(player.id),
    }))];
const getPlayerPrompts = ['playerPrompts', ({ playerTemplate, playerChoices }) =>
    [{ ...playerTemplate, choices: playerChoices }]];
const getPlayerAnswers = ['playerAnswers', ({ playerPrompts }) =>
    prompt(playerPrompts)];
const getHands = ['hands', ({ game, playerAnswers: { playersToChooseFor } }) => Promise.all(
        playersToChooseFor.map(player =>
            db.get(`hands/${game.id}/${player}`)))];
const getCandidates = ['candidates', ({ hands }) => hands.map(hand => ({
    hand,
    card: _.values(hand.cards).sort(() => 0.5 - Math.random()).slice(0, 1)[0],
}))];

transmute({
    template: {
        type: 'list',
        name: 'roundToPopulate',
        message: 'Which goal should we add candidates to?',
    },
    playerTemplate: {
        type: 'checkbox',
        name: 'playersToChooseFor',
        message: 'Which players should we choose candidates for?',
    },
})
    .extend(...get.allGames)
    .do(({ games }) => { if (!games) throw new Error('No Games to Populate!'); })
    .extend(...get.latestRounds)
    .extend(...getChoices)
    .extend(...getPrompts)
    .extend(...getAnswers)
    .extend(...getRound)
    .extend(...get.game)
    .log()
    .extend(...getPlayerChoices)
    .extend(...getPlayerPrompts)
    .extend(...getPlayerAnswers)
    .extend(...getHands)
    .extend(...getCandidates)
    .do(({ candidates }) => {
        console.log('Picked the following cards:');
        candidates.map(c => console.log(c.card.contents));
    })
    .do(...save.candidatesForRound)
    .then(() => process.exit(0));
