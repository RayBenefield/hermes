export default ({ player, queue }) => {
    if (Object.keys(queue).length === 4) {
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
    }

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
};
