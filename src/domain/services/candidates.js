import _ from 'lodash';

export default ({ candidates, player: { id }, game, round }) => [
    {
        type: 'candidates-ready-message',
        payload: {
            game: game.id,
            round: round.id,
            unranked: _.values(
                _.pickBy(candidates, (card, player) => player !== id)
            ),
        },
    },
];
