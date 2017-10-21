import uuid from 'uuid/v4';
import transmute from 'transmutation';

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
            .extend('game', ({ player }) =>
                db.get(`games/${player.game}`))
            .extend('hand', ({ player, game }) =>
                db.get(`hands/${game.id}/${player.id}`)),
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
    },
});
