import transmute from 'transmutation';

export default ({ db }) => ({
    get: {
        login: transmute()
            .extend('player', ({ lead }) =>
                db.get(`players/${lead.platform}/${lead.id}`)),
    },
    save: {
        'welcome-message': transmute()
            .do(({ lead }) => db.set(`players/${lead.platform}/${lead.id}`, lead)),
    },
});
