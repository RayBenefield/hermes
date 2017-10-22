import transmute from 'transmutation';
import configureEntites from '../../domain/entities';

export default ({ db, fb }) => {
    const { get, save } = configureEntites({ db });

    return transmute()
        .extend('messages', ({ game }) => [
            {
                type: 'game-started-message',
                payload: game,
            },
        ])
        .extend(...get.players)
        .extend(...get.unnotifiedPlayersForGame)
        .do(({ unnotifiedPlayers, messages }) => Promise.all(
            unnotifiedPlayers.map(lead => transmute({ lead, messages })
                .extend('facebookMessages', fb.transform)
                .do(({ facebookMessages }) =>
                    fb.sendMessages(lead.id, facebookMessages)))))
        .do(...save.notifiedAllPlayersOfGame)
        .do(...save.gameForPlayers)
        .do(...save.handsForPlayers)
        .do(...save.newRound);
};
