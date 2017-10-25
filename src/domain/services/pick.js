/* eslint-disable max-lines */
import _ from 'lodash';

export default ({ player = {}, whiteDeck, round = {}, pick }) => {
    if (!round.candidates) {
        return [
            {
                type: 'card-selected-message',
                payload: {
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
                card: round.candidates[player.id],
            },
        });
    } else {
        messages.push({
            type: 'card-selected-message',
            payload: {
                card: whiteDeck[pick.id],
            },
        });
    }

    if (_.values(round.candidates).length === 4) {
        messages.push({
            type: 'candidates-ready-message',
            payload: {
                pick: whiteDeck[pick.id],
                unranked: _.values(round.candidates).map(c => whiteDeck[c]),
            },
        });
        return messages;
    }

    messages.push({ type: 'wait-for-votes-message' });
    return messages;
};
