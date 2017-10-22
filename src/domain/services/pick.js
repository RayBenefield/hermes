export default ({ whiteDeck, pick }) => [
    {
        type: 'card-selected-message',
        payload: whiteDeck[pick.id],
    },
];
