import _ from 'lodash';
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
const testAccounts = ['1969918279691174', '2062932073720600', '1654450144625528', '1572553382787981'];
const { get, save } = setupEntities({ db });

const getChoices = ['choices', ({ rounds }) => rounds
    .map(round => ({
        name: round.card.contents,
        value: round.id,
    }))];
const getPrompts = ['prompts', ({ template, choices }) => [{ ...template, choices }]];
const getAnswers = ['answers', ({ prompts }) => prompt(prompts)];
const getRound = ['round', ({ rounds, answers: { roundToPopulate } }) =>
    rounds.find(r => r.id === roundToPopulate)];
const getPlayerChoices = ['playerChoices', ({ players }) => players
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
const getPlayerIds = ['payload.players', ({ game }) => _.keys(game.players)];
const getHandsForPlayers = ['hands', ({ game, players, playerAnswers: { playersToChooseFor } }) => get.hands[1]({
    players: _.filter(players, player => _.includes(playersToChooseFor, player.id)),
    game,
})];

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
    .extend(...getPlayerIds)
    .extend(...get.playersFromPayload)
    .extend(...getPlayerChoices)
    .extend(...getPlayerPrompts)
    .extend(...getPlayerAnswers)
    .extend(...getHandsForPlayers)
    .extend(...get.randomCandidates)
    .do(({ game, round, candidates }) => {
        console.log('Picked the following cards:');
        candidates.map(c => console.log(c.card.contents));
        return Promise.all(
            candidates.map(({ player, card }) => Promise.all([
                save.selectedCandidate[0]({ player: { id: player }, round, game, payload: { card } }),
                save.removedCandidateFromHand[0]({ player: { id: player }, round, game, payload: { card } }),
            ]))
        );
    })
    .then(() => process.exit(0));
