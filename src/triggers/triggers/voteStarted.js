import _ from 'lodash';
import transmute from 'transmutation';
import configureEntites from '../../domain/entities';

export default ({ db, fb }) => {
    const { get, save } = configureEntites({ db });

    return transmute()
        .extend(...get.game)
        .extend(...get.players)
        .extend(...get.unnotifiedPlayersForVoting)
        .do(({ unnotifiedPlayers, candidates }) => Promise.all(
            unnotifiedPlayers.map(lead => transmute({ lead })
                .extend('messages', () => [
                    {
                        type: 'candidates-ready-message',
                        payload: {
                            round: { id: candidates.round },
                            unranked: _.values(
                                _.pickBy(candidates.cards, (card, player) => player !== lead.id)
                            ),
                        },
                    },
                ])
                .extend('facebookMessages', fb.transform)
                .do(({ facebookMessages }) =>
                    fb.sendMessages(lead.id, facebookMessages)))))
        .do(...save.notifiedAllPlayersOfVoting);
};
