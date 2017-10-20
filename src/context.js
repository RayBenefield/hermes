import transmute from 'transmutation';

export default ({ db }) => ({
    get: {
        login: transmute()
            .extend('player', ({ lead }) =>
                db.get(`players/${lead.platform}/${lead.id}`)),
        join: transmute()
            .extend('player', ({ lead }) =>
                db.get(`players/${lead.platform}/${lead.id}`)),
    },
    save: {
        'welcome-message': transmute()
            .do(({ payload: lead }) =>
                db.set(`players/${lead.platform}/${lead.id}`, lead)),
        'joined-queue-event': transmute()
            .do(({ payload: player }) =>
                db.set(`queue/${player.id}`, player)),
    },
});
