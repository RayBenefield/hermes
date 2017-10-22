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
    .extend('games', db.get('games'))
    .do(({ games }) => { if (!games) throw new Error('No Games to Populate!'); })
    .extend('latestRounds', ({ games }) =>
        Object.values(games).map(g => [g.id, Object.values(g.rounds)[0]]))
    .extend('rounds', ({ latestRounds }) => Promise.all(
            latestRounds.map(([g, r]) => db.get(`rounds/${g}/${r}`))
        )
        .then(rounds => rounds.reduce((all, curr) => Object.assign(all, { [curr.id]: curr }), {}))
    )
    .extend('choices', ({ rounds }) => Object.values(rounds)
        .map(round => ({
            name: round.card.contents,
            value: round.id,
        }))
    )
    .extend('prompts', ({ template, choices }) => [{ ...template, choices }])
    .extend('answers', ({ prompts }) => prompt(prompts))
    .extend('round', ({ rounds, answers: { roundToPopulate } }) => rounds[roundToPopulate])
    .extend('game', ({ round, games }) => games[round.game])
    .extend('playerChoices', ({ game }) => Object.values(game.players)
        .map(player => ({
            name: `${player.first_name} ${player.last_name}`,
            value: player.id,
            short: player.first_name,
            checked: testAccounts.includes(player.id),
        }))
    )
    .extend('playerPrompts', ({ playerTemplate, playerChoices }) => [{ ...playerTemplate, choices: playerChoices }])
    .extend('playerAnswers', ({ playerPrompts }) => prompt(playerPrompts))
    .extend('hands', ({ game, playerAnswers: { playersToChooseFor } }) => Promise.all(
            playersToChooseFor.map(player => db.get(`hands/${game.id}/${player}`))
        )
        .then(hands => hands.reduce((all, curr) => Object.assign(all, { [curr.player]: curr }), {}))
    )
    .extend('candidates', ({ hands }) => Object.values(hands).map(hand => ({
        hand,
        card: Object.values(hand.cards).sort(() => 0.5 - Math.random()).slice(0, 1)[0],
    })))
    .do(({ candidates }) => {
        console.log('Picked the following cards:');
        candidates.map(c => console.log(c.card.contents));
    })
    .do(({ candidates, round }) => Promise.all(candidates
        .map(candidate => Promise.all([
            db.set(`rounds/${candidate.hand.game}/${round.id}/candidates/${candidate.hand.player}`, candidate.card),
            db.delete([`hands/${candidate.hand.game}/${candidate.hand.player}/cards/${candidate.card.id}`]),
        ]))
    ))
    .then(() => process.exit(0));
