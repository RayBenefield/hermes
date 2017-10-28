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
const getVotesForPlayers = ['votes', ({ players, playerAnswers: { playersToChooseFor } }) => playersToChooseFor
    .map(player => ({
        player: _.find(players, { id: player }),
        votes: players.filter(p => p.id !== player).sort(() => 0.5 - Math.random()).slice(0, 3).map(p => p.id),
    }))];

transmute({
    template: {
        type: 'list',
        name: 'roundToPopulate',
        message: 'Which goal should we add votes to?',
    },
    playerTemplate: {
        type: 'checkbox',
        name: 'playersToChooseFor',
        message: 'Which players should we choose votes for?',
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
    .extend(...getVotesForPlayers)
    .do(({ game, round, votes }) => Promise.all(
        votes.map(({ player, votes: playerVotes }) => Promise.all(
            playerVotes.map(vote => save.vote[0]({
                player,
                round,
                game,
                payload: { vote },
            }))
        ))
    ))
    .then(() => process.exit(0));
