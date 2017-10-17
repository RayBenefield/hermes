export default ({ db }) => ({
    welcome: ({ lead }) => {
        db.set(`players/${lead.platform}/${lead.id}`, lead);
        return {
            messages: [
                {
                    type: 'welcome-message',
                },
                {
                    type: 'instructions-message',
                },
            ],
        };
    },
});
