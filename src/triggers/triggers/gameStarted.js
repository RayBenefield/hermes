import transmute from 'transmutation';
import configureEntites from '../../domain/entities';

export default ({ db, fb }) => {
    const { get, save } = configureEntites({ db });

    return transmute()
        .extend(...get.playersFromGame)
        .extend('messages', ({ players }) => [
            {
                type: 'game-started-message',
                payload: {
                    players: players.map(player => ({
                        id: player.id,
                        first_name: player.first_name,
                    })),
                },
            },
        ])
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
