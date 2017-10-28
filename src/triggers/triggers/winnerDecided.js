import transmute from 'transmutation';
import { setupEntities } from '../../domain';

export default ({ db, fb }) => {
    const { get, save } = setupEntities({ db });

    return transmute()
        .extend(...get.game)
        .extend(...get.round)
        .extend(...get.candidates)
        .extend(...get.playersFromGame)
        .extend(...get.winner)
        .extend(...get.winningPlayer)
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
        .extend(...get.unnotifiedPlayersForWinner)
        .do(({ unnotifiedPlayers, messages }) => Promise.all(
            unnotifiedPlayers.map(lead => transmute({ lead, messages })
                .extend('facebookMessages', fb.transform)
                .do(({ facebookMessages }) =>
                    fb.sendMessages(lead.id, facebookMessages)))))
        .do(...save.notifiedAllPlayersOfWinner)
        .do(...save.newRound);
};
