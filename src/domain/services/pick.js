export default ({ player = {}, whiteDeck, game, round = {}, pick }) => {
    if (!round.candidates) {
        return [
            {
                type: 'card-selected-message',
                payload: {
                    game,
                    round,
                    card: whiteDeck[pick.id],
                },
            },
        ];
    }

    if (player.id in round.candidates) {
        return [
            {
                type: 'card-already-selected-message',
                payload: {
                    game,
                    round,
                    card: round.candidates[player.id],
                },
            },
        ];
    }

    return [
        {
            type: 'card-selected-message',
            payload: {
                game,
                round,
                card: whiteDeck[pick.id],
            },
        },
    ];
};
