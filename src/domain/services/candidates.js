import _ from 'lodash';

export default ({ candidates, unnotifiedPlayers, game, round }) => unnotifiedPlayers
    .map(({ id }) => ({
        player: id.toString(),
        type: 'notify-candidates-ready-message',
        payload: {
            game: game.id,
            round: round.id,
            unranked: _.values(
                _.pickBy(candidates, (card, player) => player !== id)
            ),
        },
    }));
