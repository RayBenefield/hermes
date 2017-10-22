/* eslint-disable max-lines */
import _ from 'lodash';
import uuid from 'uuid/v4';
import whiteDeck from '../data/white-deck.json';
import blackDeck from '../data/black-deck.json';

export default ({ db }) => ({
    get: {
        allGames: ['games', db.get('games').then(_.values)],
        allPlayers: ['players', db.get('players/facebook').then(_.values)],
        player: ['player', ({ lead }) => db.get(`players/${lead.platform}/${lead.id}`)],
        queue: ['queue', () => db.get('queue')],
        game: ['game', ({ games, round, payload: { game } = {} }) => {
            if (game && games) return games.find(g => g.id === game);
            if (round && games) return games.find(g => g.id === round.game);
            if (game) return db.get(`games/${game}`);
            if (round) return db.get(`games/${round.game}`);
            return undefined;
        }],
        round: ['round', ({ game, payload: { round } }) => db.get(`rounds/${game.id}/${round}`)],
        hand: ['hand', ({ player, game }) => db.get(`hands/${game.id}/${player.id}`)],
        whiteDeck: ['whiteDeck', whiteDeck],
        blackDeck: ['blackDeck', blackDeck],
        pick: ['pick', ({ payload: { pick } }) => whiteDeck[pick]],
        card: ['card', () => blackDeck.sort(() => 0.5 - Math.random()).slice(0, 1)[0]],
        players: ['players', ({ game: { players } }) => _.values(players)],
        unnotifiedPlayersForGame: ['unnotifiedPlayers', ({ players, game: { notified_players: notified } }) =>
            players.filter(({ id }) => !(id in notified))],
        unnotifiedPlayersForVoting: ['unnotifiedPlayers', ({ players, candidates: { notified_players: notified } }) =>
            players.filter(({ id }) => !(id in notified))],
        latestRounds: ['rounds', ({ games }) => Promise.all(games
            .map(g => [g.id, _.values(g.rounds)[0]])
            .map(([game, round]) => db.get(`rounds/${game}/${round}`)))],
        randomCandidates: ['candidates', ({ hands }) => hands.map(hand => ({
            game: hand.game,
            player: hand.player,
            card: _.values(hand.cards).sort(() => 0.5 - Math.random()).slice(0, 1)[0],
        }))],
    },
    save: {
        queue: [({ queue }) => db.set('queue', queue)],
        playerInfo: [({ payload: lead }) => db.set(`players/${lead.platform}/${lead.id}`, lead)],
        playerToQueue: [({ payload: { player } }) => db.set(`queue/${player.id}`, player)],
        removalFromQueue: [({ payload: { players } }) => db.delete(_.values(players).map(p => `queue/${p.id}`))],
        newGame: [({ player, payload: { players } }) => {
            const id = uuid();
            db.set(`games/${id}`, {
                id,
                players,
                notified_players: { [player.id]: player },
            });
        }],
        roundForGame: [({ game, round }) => db.push(`games/${game.id}/rounds`, round.id)],
        goalForRound: [({ game, round, card }) => db.set(`rounds/${game.id}/${round.id}/card`, card)],
        selectedCandidate: [({ payload: { game, round, card }, player }) =>
            db.set(`rounds/${game.id}/${round.id}/candidates/${player.id}`, card)],
        removalOfCandidateFromHand: [({ payload: { game, card }, player }) =>
            db.delete([`hands/${game.id}/${player.id}/cards/${card.id}`])],
        notifiedAllPlayersOfGame: [({ game: { id, players } }) =>
            db.set(`games/${id}/notified_players`, players)],
        notifiedAllPlayersOfVoting: [({ players, candidates: { round, game } }) =>
            db.set(`candidates/${game}/${round}/notified_players`, players.reduce((all, curr) =>
                Object.assign(all, { [curr.id]: true }), {}))],
        gameForPlayers: [({ players, game: { id } }) => Promise.all(
            players.map(player =>
                db.set(`players/facebook/${player.id}/games/${id}`)))],
        handsForPlayers: [({ players, game: { id } }) => Promise.all(players
            .map(p => ({ player: p }))
            .map(p => ({ ...p, hand: whiteDeck.sort(() => 0.5 - Math.random()).slice(0, 10) }))
            .map(({ player, hand }) => ({
                player,
                hand: hand.reduce((h, c) => Object.assign(h, { [c.id]: c }), {}),
            }))
            .map(({ player, hand }) => db.set(`hands/${id}/${player.id}`, {
                game: id,
                player: player.id,
                cards: hand,
            })))],
        newRound: [({ game }) => {
            const id = uuid();
            return db.set(`rounds/${game.id}/${id}`, { id, game: game.id });
        }],
        deletedGame: [({ game }) => db.delete([
            `games/${game.id}`,
            `hands/${game.id}`,
            `rounds/${game.id}`,
            `candidates/${game.id}`,
            ...(_.values(game.players)
                .map(p => `players/facebook/${p.id}/games/${game.id}`)),
        ])],
        candidateForRound: [({ candidate, round }) =>
            db.set(`rounds/${candidate.game}/${round.id}/candidates/${candidate.player}`, candidate.card)],
        removedCandidateFromHand: [({ candidate }) =>
            db.delete([`hands/${candidate.game}/${candidate.player}/cards/${candidate.card.id}`])],
        candidateList: [({ player, payload: { pick, round } }) =>
            db.set(`candidates/${round.game}/${round.id}/`, {
                game: round.game,
                round: round.id,
                notified_players: {
                    [player.id]: true,
                },
                cards: {
                    ...round.candidates,
                    [player.id]: pick,
                },
            })],
    },
});
