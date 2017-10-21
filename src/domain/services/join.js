export default ({ player, queue = {} } = {}) => {
    if (!player) return [{ type: 'player-does-not-exist-message' }];

    if (player.id in queue) {
        return [
            {
                type: 'already-in-queue-message',
                payload: {
                    ...queue,
                },
            },
        ];
    }

    if (Object.keys(queue).length <= 3) {
        return [
            {
                type: 'queue-joined-message',
                payload: {
                    player,
                    queue: {
                        ...queue,
                        [player.id]: player,
                    },
                },
            },
        ];
    }

    return [
        {
            type: 'game-started-message',
            payload: {
                accepted_players: {
                    [player.id]: player,
                },
                players: {
                    ...queue,
                    [player.id]: player,
                },
            },
        },
    ];
};
