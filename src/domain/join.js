export default ({ player, queue = {} }) => {
    if (player.id in queue) {
        return [
            {
                type: 'already-in-queue-message',
                payload: {
                    queue,
                    player,
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
                players: {
                    ...queue,
                    [player.id]: player,
                },
            },
        },
    ];
};
