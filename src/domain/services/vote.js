/* eslint-disable max-lines */
import _ from 'lodash';

export default ({ playerVotes, vote, candidates, player, game, round }) => {
    if (_.isEmpty(playerVotes)) {
        return [
            {
                type: 'show-ranked-list',
                payload: {
                    game: game.id,
                    round: round.id,
                    vote: _.keys(
                        _.pickBy(candidates, c => c.id === vote.id)
                    )[0],
                    ranked: [vote],
                    unranked: _.values(_.pickBy(candidates, (c, p) => p !== player.id))
                        .filter(c => c.id !== vote.id),
                },
            },
        ];
    }

    if (playerVotes.length === 2) {
        const otherCandidates = _.pickBy(candidates, (c, p) => p !== player.id);
        const base = [...playerVotes, vote];
        const ranked = [...base, ..._.differenceBy(_.values(otherCandidates), base, 'id')];
        return [
            {
                type: 'show-votes-message',
                payload: {
                    game: game.id,
                    round: round.id,
                    vote: _.keys(
                        _.pickBy(candidates, c => c.id === vote.id)
                    )[0],
                    ranked,
                },
            },
        ];
    }

    const otherCandidates = _.pickBy(candidates, (c, p) => p !== player.id);
    const ranked = [...playerVotes, vote];
    return [
        {
            type: 'show-ranked-list',
            payload: {
                game: game.id,
                round: round.id,
                vote: _.keys(
                    _.pickBy(candidates, c => c.id === vote.id)
                )[0],
                ranked,
                unranked: _.differenceBy(_.values(otherCandidates), ranked, 'id'),
            },
        },
    ];
};
