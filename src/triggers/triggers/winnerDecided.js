import transmute from 'transmutation';
import configureEntites from '../../domain/entities';

export default ({ db, fb }) => {
    const { get, save } = configureEntites({ db });

    return transmute()
        .extend(...get.game)
        .extend(...get.round)
        .extend(...get.candidates)
        .extend(...get.playersFromGame)
        .extend(...get.winner)
        .extend(...get.winningPlayer)
        .log('after winning player')
        .extend('messages', ({ winner, round, winningPlayer }) => [
            {
                type: 'show-winner-message',
                payload: {
                    goal: round.card,
                    winner,
                    player: winningPlayer,
                },
            },
        ])
        .log('before unnotified')
        .extend(...get.unnotifiedPlayersForWinner)
        .log('after unnotified')
        .do(({ unnotifiedPlayers, messages }) => Promise.all(
            unnotifiedPlayers.map(lead => transmute({ lead, messages })
                .extend('facebookMessages', fb.transform)
                .do(({ facebookMessages }) =>
                    fb.sendMessages(lead.id, facebookMessages)))))
        .do(...save.notifiedAllPlayersOfWinner)
        .do(...save.newRound);
};
