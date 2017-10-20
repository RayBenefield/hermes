export default ({ player }) => [
    {
        type: 'joined-queue-event',
        payload: player,
    },
];
