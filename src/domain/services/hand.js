export default ({ hand }) => [
    {
        type: 'show-hand-message',
        payload: {
            cards: hand,
        },
    },
];
