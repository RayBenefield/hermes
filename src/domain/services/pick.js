export default ({ whiteDeck, game, round, pick }) => [
    {
        type: 'card-selected-message',
        payload: {
            game,
            round,
            card: whiteDeck[pick.id],
        },
    },
];
