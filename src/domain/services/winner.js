export default ({ winner, round, winningPlayer }) => [
    {
        type: 'notify-winner-message',
        payload: {
            goal: round.card,
            winner,
            player: winningPlayer,
        },
    },
];
