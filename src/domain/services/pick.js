/* eslint-disable max-lines */
import _ from 'lodash';

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
            { type: 'wait-for-votes-message' },
        ];
    }

    const messages = [];
    if (player.id in round.candidates) {
        messages.push({
            type: 'card-already-selected-message',
            payload: {
                game,
                round,
                card: round.candidates[player.id],
            },
        });
    } else {
        messages.push({
            type: 'card-selected-message',
            payload: {
                game,
                round,
                card: whiteDeck[pick.id],
            },
        });
    }

    if (_.values(round.candidates).length === 4) {
        messages.push({
            type: 'candidates-ready-message',
            payload: {
                round,
                pick,
                unranked: _.values(round.candidates),
            },
        });
        return messages;
    }

    messages.push({ type: 'wait-for-votes-message' });
    return messages;
};
