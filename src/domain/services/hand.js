export default ({ candidates, player = {}, game, round, hand }) => {
    if (!candidates) {
        return [
            {
                type: 'show-hand-for-picking-message',
                payload: {
                    game: game.id,
                    round: round.id,
                    cards: hand.cards,
                },
            },
        ];
    }

    if (player.id in candidates) {
        return [
            {
                type: 'show-hand-message',
                payload: {
                    cards: hand.cards,
                },
            },
        ];
    }


    return [
        {
            type: 'show-hand-for-picking-message',
            payload: {
                game: game.id,
                round: round.id,
                cards: hand.cards,
            },
        },
    ];
};
