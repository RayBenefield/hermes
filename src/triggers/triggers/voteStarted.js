import _ from 'lodash';
import transmute from 'transmutation';
import configureEntites from '../../domain/entities';
import whiteDeck from '../../data/white-deck.json';

export default ({ db, fb }) => {
    const { get, save } = configureEntites({ db });

    return transmute()
        .extend(...get.game)
        .extend(...get.playersFromGame)
        .extend(...get.unnotifiedPlayersForVoting)
        .do(({ unnotifiedPlayers, candidates: { candidates } }) => Promise.all(
            unnotifiedPlayers.map(lead => transmute({ lead })
                .extend('messages', () => [
                    {
                        type: 'candidates-ready-message',
                        payload: {
                            unranked: _.values(
                                _.pickBy(candidates, (card, player) => player !== lead.id)
                            ).map(c => whiteDeck[c]),
                        },
                    },
                ])
                .extend('facebookMessages', fb.transform)
                .do(({ facebookMessages }) =>
                    fb.sendMessages(lead.id, facebookMessages)))))
        .do(...save.notifiedAllPlayersOfVoting);
};
