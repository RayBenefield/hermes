import transmute from 'transmutation';

export default ({ db }) => ({
    login: transmute()
        .do(({ lead }) => db.set(`players/${lead.platform}/${lead.id}`, lead))
        .extend('messages', [
            {
                type: 'welcome-message',
            },
            {
                type: 'instructions-message',
            },
        ]),
});
