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
    },
    save: {
        'welcome-message': transmute()
            .do(({ payload: lead }) =>
                db.set(`players/${lead.platform}/${lead.id}`, lead)),
        'queue-joined-message': transmute()
            .do(({ payload: { player } }) =>
                db.set(`queue/${player.id}`, player)),
    },
});
