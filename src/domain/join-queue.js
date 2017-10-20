export default ({ player, queue }) => [
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
