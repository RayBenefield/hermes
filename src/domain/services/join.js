export default ({ player, queue = [] } = {}) => {
    if (!player) return [{ type: 'player-does-not-exist-message' }];

    if (queue.includes(player.id)) {
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

    return [
        {
            type: 'game-started-message',
            payload: {
                players: [
                    ...queue,
                    player.id,
                ],
            },
        },
    ];
};
