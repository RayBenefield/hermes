export default ({ game, round, hand }) => [
    {
        type: 'show-hand-message',
        payload: {
            game,
            round,
            cards: hand,
        },
    },
];
