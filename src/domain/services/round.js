export default ({ round, game, card }) => [
    {
        type: 'new-goal-message',
        payload: {
            game: game.id,
            round: round.id,
            card,
        },
    },
];
