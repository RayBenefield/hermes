export default ({ whiteDeck, payload }) => [
    {
        type: 'card-selected-message',
        payload: whiteDeck[payload],
    },
];
