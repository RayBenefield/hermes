/* eslint-disable max-lines */
import uuid from 'uuid/v4';
import transmute from 'transmutation';
import whiteDeck from '../data/white-deck.json';

export default ({ db }) => {
    const entities = {
        player: ['player', ({ lead }) => db.get(`players/${lead.platform}/${lead.id}`)],
        queue: ['queue', () => db.get('queue')],
        game: ['game', ({ payload: { game } }) => db.get(`games/${game}`)],
        round: ['round', ({ game, payload: { round } }) => db.get(`rounds/${game.id}/${round}`)],
        hand: ['hand', ({ player, game }) => db.get(`hands/${game.id}/${player.id}`)],
        whiteDeck: ['whiteDeck', whiteDeck],
        pick: ['pick', ({ payload: { pick } }) => whiteDeck[pick]],
    };

    return {
        get: {
            login: transmute().extend(...entities.player),
            join: transmute()
                .extend(...entities.player)
                .extend(...entities.queue),
            hand: transmute()
                .extend(...entities.player)
                .extend(...entities.game)
                .extend(...entities.round)
                .extend(...entities.hand),
            pick: transmute()
                .extend(...entities.player)
                .extend(...entities.game)
                .extend(...entities.round)
                .extend(...entities.whiteDeck)
                .extend(...entities.pick),
        },
        save: {
            'welcome-message': transmute()
            .do(({ payload: lead }) =>
                db.set(`players/${lead.platform}/${lead.id}`, lead)),
            'welcome-back-message': transmute()
            .do(({ payload: { lead } }) =>
                db.set(`players/${lead.platform}/${lead.id}`, lead)),
            'queue-joined-message': transmute()
            .do(({ payload: { player } }) =>
                db.set(`queue/${player.id}`, player)),
            'game-started-message': transmute()
            .do(({ player, payload: { players } }) => {
                const id = uuid();
                db.set(`games/${id}`, {
                    id,
                    players,
                    notified_players: { [player.id]: player },
                });
                db.delete(Object.values(players).map(p => `queue/${p.id}`));
            }),
            'card-selected-message': transmute()
            .do(({ payload: { game, round, card }, player }) =>
                db.set(`rounds/${game.id}/${round.id}/candidates/${player.id}`, card))
            .do(({ payload: { game, card }, player }) =>
                db.delete([`hands/${game.id}/${player.id}/cards/${card.id}`])),
        },
    };
};
