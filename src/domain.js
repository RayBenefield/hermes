import transmute from 'transmutation';

export default {
    login: transmute()
        .switch('player', {
            undefined: transmute()
                .extend('messages', ({ lead }) => ([
                    {
                        type: 'welcome-message',
                        payload: lead,
                    },
                    { type: 'instructions-message' },
                ])),
            _default: transmute()
                .extend('messages', ({ lead, player }) => ([
                    {
                        type: 'welcome-back-message',
                        payload: {
                            lead,
                            player,
                        },
                    },
                ])),
        }),
};
