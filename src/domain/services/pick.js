/* eslint-disable max-lines */
import _ from 'lodash';

export default ({ candidates, player = {}, pick, round, game }) => {
    if (!candidates) {
        return [
            {
                type: 'card-selected-message',
                payload: {
                    card: pick,
                },
            },
            { type: 'wait-for-votes-message' },
        ];
    }

    const messages = [];
    if (player.id in candidates) {
        messages.push({
            type: 'card-already-selected-message',
            payload: {
                card: candidates[player.id],
            },
        });
    } else {
        messages.push({
            type: 'card-selected-message',
            payload: {
                card: pick,
            },
        });
    }

    if (_.values(candidates).length === 4) {
        messages.push({
            type: 'candidates-ready-message',
            payload: {
                game: game.id,
                round: round.id,
                pick,
                unranked: _.values(candidates),
            },
        });
        return messages;
    }

    messages.push({ type: 'wait-for-votes-message' });
    return messages;
};
