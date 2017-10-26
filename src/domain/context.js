/* eslint-disable max-lines */
import transmute from 'transmutation';
import configureEntites from './entities';

export default ({ db }) => {
    const { get, save } = configureEntites({ db });

    return {
        get: {
            login: transmute().extend(...get.player),
            join: transmute()
                .extend(...get.player)
                .extend(...get.queue)
                .extend(...get.allPlayersInQueue),
            hand: transmute()
                .extend(...get.player)
                .extend(...get.game)
                .extend(...get.round)
                .extend(...get.hand)
                .extend(...get.candidates),
            pick: transmute()
                .extend(...get.player)
                .extend(...get.game)
                .extend(...get.round)
                .extend(...get.pick)
                .extend(...get.candidates),
            vote: transmute()
                .extend(...get.player)
                .extend(...get.round)
                .extend(...get.game)
                .extend(...get.vote)
                .extend(...get.candidates),
        },
        save: {
            'welcome-message': transmute().do(...save.playerInfo),
            'welcome-back-message': transmute().do(...save.playerInfo),
            'queue-joined-message': transmute().do(...save.playerToQueue),
            'game-started-message': transmute()
                .do(...save.newGame)
                .do(...save.removalFromQueue),
            'card-selected-message': transmute()
                .do(...save.selectedCandidate)
                .do(...save.removalOfCandidateFromHand),
            'candidates-ready-message': transmute()
                .do(...save.candidateList),
        },
    };
};
