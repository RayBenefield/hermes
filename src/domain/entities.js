import uuid from 'uuid/v4';
import whiteDeck from '../data/white-deck.json';

export default ({ db }) => ({
    get: {
        player: ['player', ({ lead }) => db.get(`players/${lead.platform}/${lead.id}`)],
        queue: ['queue', () => db.get('queue')],
        game: ['game', ({ round, payload: { game } = {} }) => {
            if (game) return db.get(`games/${game}`);
            if (round) return db.get(`games/${round.game}`);
            return undefined;
        }],
        round: ['round', ({ game, payload: { round } }) => db.get(`rounds/${game.id}/${round}`)],
        hand: ['hand', ({ player, game }) => db.get(`hands/${game.id}/${player.id}`)],
        whiteDeck: ['whiteDeck', whiteDeck],
        pick: ['pick', ({ payload: { pick } }) => whiteDeck[pick]],
    },
    save: {
        playerInfo: [({ payload: lead }) => db.set(`players/${lead.platform}/${lead.id}`, lead)],
        toQueue: [({ payload: { player } }) => db.set(`queue/${player.id}`, player)],
        removalFromQueue: [({ payload: { players } }) => db.delete(Object.values(players).map(p => `queue/${p.id}`))],
        newGame: [({ player, payload: { players } }) => {
            const id = uuid();
            db.set(`games/${id}`, {
                id,
                players,
                notified_players: { [player.id]: player },
            });
        }],
        selectedCandidate: [({ payload: { game, round, card }, player }) =>
            db.set(`rounds/${game.id}/${round.id}/candidates/${player.id}`, card)],
        removalOfCandidateFromHand: [({ payload: { game, card }, player }) =>
            db.delete([`hands/${game.id}/${player.id}/cards/${card.id}`])],
    },
});
