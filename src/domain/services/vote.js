/* eslint-disable max-lines */
import _ from 'lodash';
import { Election, irv } from 'caritat';

export default ({ playerVotes, vote, votes = [], candidates, player, players, game, round }) => {
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
        const messages = [];

        messages.push({
            type: 'show-votes-message',
            payload: {
                game: game.id,
                round: round.id,
                vote: _.keys(
                    _.pickBy(candidates, c => c.id === vote.id)
                )[0],
                ranked,
            },
        });

        if (_.keys(votes).length === 5) {
            const election = new Election({
                candidates: _.map(players, p => p.id.toString()),
            });

            votes[player.id].push(_.findKey(candidates, c => c.id === vote.id));
            _.forIn(votes, v => election.addBallot(v));
            const winnerId = irv(election);
            const winner = candidates[winnerId];

            messages.push({
                type: 'show-winner-message',
                payload: {
                    goal: round.card,
                    winner,
                    player: _.find(players, { id: winnerId }),
                },
            });
        }
        return messages;
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
