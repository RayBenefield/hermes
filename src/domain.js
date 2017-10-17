import transmute from 'transmutation';

export default ({ db }) => ({
    login: transmute()
        .extend('player', ({ lead }) =>
            db.get(`players/${lead.platform}/${lead.id}`))
        .switch('player', {
            undefined: transmute()
                // TODO: Create a uuid for the player
                .do(({ lead }) => db.set(`players/${lead.platform}/${lead.id}`, lead))
                .extend('messages', [
                    { type: 'welcome-message' },
                    { type: 'instructions-message' },
                ]),
            _default: transmute()
                .extend('messages', [
                    { type: 'welcome-back-message' },
                ]),
        }),
});
