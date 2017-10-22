export default ({ player = {}, game, round = {}, hand }) => {
    if (!round.candidates) {
        return [
            {
                type: 'show-hand-for-picking-message',
                payload: {
                    game,
                    round,
                    cards: hand,
                },
            },
        ];
    }

    if (player.id in round.candidates) {
        return [
            {
                type: 'show-hand-message',
                payload: {
                    cards: hand,
                },
            },
        ];
    }


    return [
        {
            type: 'show-hand-for-picking-message',
            payload: {
                game,
                round,
                cards: hand,
            },
        },
    ];
};
