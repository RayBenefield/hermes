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
        queue: ['queue', () => db.get('queue').then(_.keys)],
        allPlayersInQueue: ['players', ({ queue }) => Promise.all(queue
            .map(player => db.get(`players/facebook/${player}`)))],
        game: ['game', ({ games, round, payload: { game: gameId } = {} }) => {
            if (gameId && games) return games.find(g => g.id === gameId);
            if (round && games) return games.find(g => g.id === round.game);
            if (gameId) return db.get(`games/${gameId}`);
            if (round) return db.get(`games/${round.game}`);
            return undefined;
        }],
        round: ['round', ({ game, payload: { round: roundId, game: gameId } }) => {
            if (roundId && game) return db.get(`rounds/${game.id}/${roundId}`);
            if (roundId && gameId) return db.get(`rounds/${gameId}/${roundId}`);
            return undefined;
        }],
        hand: ['hand', ({ player, game }) => db.get(`hands/${game.id}/${player.id}`)
            .then(hand => ({
                ...hand,
                cards: _.keys(hand.cards).map(c => whiteDeck[c]),
            }))],
        candidates: ['candidates', ({ round }) => _.mapValues(round.candidates, candidate => whiteDeck[candidate])],
        hands: ['hands', ({ game, players }) => Promise.all(players
            .map(player => db.get(`hands/${game.id}/${player.id}`)
                .then(hand => ({
                    ...hand,
                    cards: _.keys(hand.cards).map(c => whiteDeck[c]),
                }))))],
        whiteDeck: ['whiteDeck', whiteDeck],
        blackDeck: ['blackDeck', blackDeck],
        pick: ['pick', ({ payload: { pick } }) => whiteDeck[pick]],
        vote: ['vote', ({ payload: { vote } }) => whiteDeck[vote]],
        votes: ['votes', ({ round: { votes } }) => {
            if (!votes) return {};
            return _.mapValues(votes, v => _.values(v));
        }],
        playerVotes: ['playerVotes', ({ player, candidates, votes }) => {
            if (!votes[player.id]) return [];
            return votes[player.id]
                .map(votedFor => candidates[votedFor]);
        }],
        card: ['card', () => blackDeck.sort(() => 0.5 - Math.random()).slice(0, 1)[0]],
        playersFromGame: ['players', ({ game: { players } }) => Promise.all(_.keys(players)
            .map(p => db.get(`players/facebook/${p}`)))],
        playersFromPayload: ['players', ({ payload: { players } }) => Promise.all(players
            .map(player => db.get(`players/facebook/${player}`)))],
        unnotifiedPlayersForGame: ['unnotifiedPlayers', ({ players, game: { notified_players: notified } }) =>
            players.filter(({ id }) => !(_.includes(_.keys(notified), id)))],
        unnotifiedPlayersForVoting: ['unnotifiedPlayers', ({ players, payload: { notified } }) =>
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
        queue: [({ queue }) => db.set('queue', queue.reduce((q, p) => Object.assign(q, { [p]: true }), {}))],
        playerInfo: [({ payload: lead }) => db.set(`players/${lead.platform}/${lead.id}`, lead)],
        playerToQueue: [({ payload: { player } }) => db.set(`queue/${player}`)],
        removalFromQueue: [({ payload: { players } }) => db.delete(players.map(p => `queue/${p.id}`))],
        newGame: [({ player, payload: { players } }) => {
            const id = uuid();
            db.set(`games/${id}`, {
                id,
                players: players.reduce((a, p) => Object.assign(a, { [p.id]: true }), {}),
                notified_players: { [player.id]: true },
            });
        }],
        roundForGame: [({ game, round }) => db.push(`games/${game.id}/rounds`, round.id)],
        goalForRound: [({ game, round, card }) => db.set(`rounds/${game.id}/${round.id}/card`, card)],
        removalOfCandidateFromHand: [({ player, game, payload: { card } }) =>
            db.delete([`hands/${game.id}/${player.id}/cards/${card.id}`])],
        notifiedAllPlayersOfGame: [({ players, game: { id } }) =>
            db.set(`games/${id}/notified_players`, players.reduce((a, p) => Object.assign(a, { [p.id]: true }), {}))],
        notifiedAllPlayersOfVoting: [({ players, round, game }) =>
            db.set(`candidates/${game.id}/${round.id}/notified_players`, players.reduce((all, curr) =>
                Object.assign(all, { [curr.id]: true }), {}))],
        gameForPlayers: [({ players, game: { id } }) => Promise.all(
            players.map(player =>
                db.set(`players/facebook/${player.id}/games/${id}`)))],
        handsForPlayers: [({ players, game: { id } }) => Promise.all(players
            .map(p => ({ player: p }))
            .map(p => ({ ...p, hand: whiteDeck.sort(() => 0.5 - Math.random()).slice(0, 10) }))
            .map(({ player, hand }) => ({
                player,
                hand: hand.reduce((h, c) => Object.assign(h, { [c.id]: true }), {}),
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
            ...(_.keys(game.players)
                .map(p => `players/facebook/${p}/games/${game.id}`)),
        ])],
        selectedCandidate: [({ player, round, game, payload: { card } }) =>
            db.set(`rounds/${game.id}/${round.id}/candidates/${player.id}`, card.id)],
        removedCandidateFromHand: [({ player, game, payload: { card } }) =>
            db.delete([`hands/${game.id}/${player.id}/cards/${card.id}`])],
        candidateList: [({ player, round, game, payload: { pick } }) =>
            db.set(`candidates/${game.id}/${round.id}/`, {
                game: game.id,
                round: round.id,
                notified_players: {
                    [player.id]: true,
                },
                candidates: {
                    ...round.candidates,
                    [player.id]: pick.id,
                },
            })],
        vote: [({ player, round, game, payload: { vote } }) =>
            db.push(`rounds/${game.id}/${round.id}/votes/${player.id}`, vote)],
        winner: [({ round, game, payload: { winner } }) =>
            db.set(`rounds/${game.id}/${round.id}/winner`, winner.id)],
        notifiedPlayerOfWinner: [({ player, round, game }) =>
            db.set(`rounds/${game.id}/${round.id}/notified_players/${player.id}`)],
    },
});
