export default ({ player, players, queue = [] } = {}) => {
    if (!player) return [{ type: 'player-does-not-exist-message' }];

    if (queue.includes(player.id.toString())) {
        return [
            {
                type: 'already-in-queue-message',
                payload: { queue },
            },
        ];
    }

    if (Object.keys(queue).length <= 3) {
        return [
            {
                type: 'queue-joined-message',
                payload: {
                    player: player.id,
                    queue: [
                        ...queue,
                        player.id,
                    ],
                },
            },
        ];
    }

    const playersInGame = players
        .filter(({ id }) => queue.includes(id.toString()))
        .map(p => ({
            id: p.id,
            first_name: p.first_name,
        }));

    return [
        {
            type: 'game-started-message',
            payload: {
                players: [
                    {
                        id: player.id,
                        first_name: player.first_name,
                    },
                    ...playersInGame,
                ],
            },
        },
    ];
};
