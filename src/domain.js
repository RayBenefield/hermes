export default () => ({
    welcome: () => ({
        messages: [
            {
                type: 'welcome-message',
            },
            {
                type: 'instructions-message',
            },
        ],
    }),
});
