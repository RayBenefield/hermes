import _ from 'lodash';

export default ({ player, votes, vote, game, round: { id, candidates } }) => {
    if (_.isEmpty(votes)) {
        return [
            {
                type: 'show-ranked-list',
                payload: {
                    game: game.id,
                    round: id,
                    ranked: [vote],
                    unranked: _.values(_.pickBy(candidates, (c, p) => p !== player.id))
                        .filter(c => c.id !== vote.id),
                },
            },
        ];
    }

    if (votes.length === 2) {
        const base = [...votes, vote];
        const ranked = [...base, ..._.differenceBy(_.values(candidates), base, 'id')];
        return [
            {
                type: 'show-votes-message',
                payload: {
                    ranked,
                },
            },
        ];
    }

    const ranked = [...votes, vote];
    return [
        {
            type: 'show-ranked-list',
            payload: {
                game: game.id,
                round: id,
                ranked,
                unranked: _.differenceBy(_.values(candidates), ranked, 'id'),
            },
        },
    ];
};
