import _ from 'lodash';

export default ({ votes, vote, candidates }) => {
    if (_.isEmpty(votes)) {
        return [
            {
                type: 'show-ranked-list',
                payload: {
                    ranked: [vote],
                    unranked: candidates.filter(c => c.id !== vote.id),
                },
            },
        ];
    }

    if (votes.length === 2) {
        const base = [...votes, vote];
        const ranked = [...base, ..._.differenceBy(candidates, base, 'id')];
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
                ranked,
                unranked: _.differenceBy(candidates, ranked, 'id'),
            },
        },
    ];
};
