export default ({ players }) => [
    {
        type: 'notify-game-started-message',
        payload: {
            players: players.map(player => ({
                id: player.id.toString(),
                first_name: player.first_name,
            })),
        },
    },
];
