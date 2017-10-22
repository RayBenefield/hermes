/* eslint-disable max-lines */
import uuid from 'uuid/v4';
import transmute from 'transmutation';
import whiteDeck from '../data/white-deck.json';

export default ({ db }) => ({
    get: {
        login: transmute()
            .extend('player', ({ lead }) =>
                db.get(`players/${lead.platform}/${lead.id}`)),
        join: transmute()
            .extend('player', ({ lead }) =>
                db.get(`players/${lead.platform}/${lead.id}`))
            .extend('queue', () => db.get('queue')),
        hand: transmute()
            .extend('player', ({ lead }) =>
                db.get(`players/${lead.platform}/${lead.id}`))
            .extend('game', ({ payload: { game } }) =>
                db.get(`games/${game}`))
            .extend('round', ({ game, payload: { round } }) =>
                db.get(`rounds/${game.id}/${round}`))
            .extend('hand', ({ player, game }) =>
                db.get(`hands/${game.id}/${player.id}`)),
        pick: transmute()
            .extend('player', ({ lead }) =>
                db.get(`players/${lead.platform}/${lead.id}`))
            .extend('game', ({ payload: { game } }) =>
                db.get(`games/${game}`))
            .extend('round', ({ game, payload: { round } }) =>
                db.get(`rounds/${game.id}/${round}`))
            .extend('whiteDeck', whiteDeck)
            .extend('pick', ({ payload: { pick } }) => whiteDeck[pick]),
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
                db.delete([`hands/${game.id}/${player.id}/${card.id}`], card)),
    },
});
