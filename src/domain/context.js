/* eslint-disable max-lines */
import transmute from 'transmutation';
import configureEntites from './entities';

export default ({ db, uuid, random, delay }) => {
    const { get, save } = configureEntites({ db, uuid, random });

    return {
        get: {
            login: transmute().extend(...get.player),
            join: transmute()
                .extend(...get.player)
                .extend(...get.queue)
                .extend(...get.allPlayersInQueue),
            start: transmute()
                .extend(...get.playersFromGame)
                .extend(...get.unnotifiedPlayersForGame),
            round: transmute()
                .extend(...get.game)
                .extend(...get.card)
                .extend(...get.playersFromGame),
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
                .extend(...get.hand)
                .extend(...get.candidates),
            candidates: transmute()
                .extend(...get.game)
                .extend(...get.round)
                .extend(...get.candidates)
                .extend(...get.playersFromGame)
                .extend(...get.unnotifiedPlayersForVoting),
            vote: transmute()
                .extend(...get.player)
                .extend(...get.round)
                .extend(...get.game)
                .extend(...get.playersFromGame)
                .extend(...get.vote)
                .extend(...get.candidates)
                .extend(...get.votes)
                .extend(...get.playerVotes),
            winner: transmute()
                .extend(...get.game)
                .extend(...get.round)
                .extend(...get.candidates)
                .extend(...get.playersFromGame)
                .extend(...get.winner)
                .extend(...get.winningPlayer)
                .extend(...get.unnotifiedPlayersForWinner),
        },
        saveByAction: {
            start: transmute()
                .do(...save.notifiedAllPlayersOfGame)
                .do(...save.gameForPlayers)
                .do(...save.handsForPlayers)
                .do(...save.newRound),
            candidates: transmute()
                .do(...save.notifiedAllPlayersOfVoting),
            winner: transmute()
                .do(...save.notifiedAllPlayersOfWinner)
                .do(...save.newRound),
        },
        save: {
            'welcome-message': transmute().do(...save.playerInfo),
            'welcome-back-message': transmute().do(...save.playerInfo),
            'queue-joined-message': transmute().do(...save.playerToQueue),
            'game-started-message': transmute()
                .do(...save.newGame)
                .do(...save.removalFromQueue),
            'new-goal-message': transmute()
                .do(...save.roundForGame)
                .do(...save.goalForRound)
                .do(delay(5000)),
            'card-selected-message': transmute()
                .do(...save.selectedCandidate)
                .do(...save.removalOfCandidateFromHand),
            'candidates-ready-message': transmute()
                .do(...save.candidateList),
            'show-ranked-list': transmute()
                .do(...save.vote),
            'show-votes-message': transmute()
                .do(...save.vote),
            'show-winner-message': transmute()
                .do(...save.notifiedPlayerOfWinner)
                .do(...save.winner),
        },
    };
};
