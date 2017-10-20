export default {
    login: ({ lead, player }) => {
        if (player) {
            return [
                {
                    type: 'welcome-back-message',
                    payload: {
                        lead,
                        player,
                    },
                },
            ];
        }

        return [
            {
                type: 'welcome-message',
                payload: lead,
            },
            { type: 'instructions-message' },
        ];
    },
};
