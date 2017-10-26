import transmute from 'transmutation';
import configureEntites from '../../domain/entities';

export default ({ db, fb, enterDomain }) => {
    const { get, save } = configureEntites({ db });

    return transmute()
        .extend(...get.game)
        .extend(...get.round)
        .extend(...get.candidates)
        .extend(...get.playersFromGame)
        .extend(...get.unnotifiedPlayersForVoting)
        .doEach('unnotifiedPlayers', (snowball, unnotifiedPlayer) =>
            transmute(snowball)
                .extend('lead', unnotifiedPlayer)
                .extend('player', unnotifiedPlayer)
                .extend('messages', transmute()
                    .switch('action', enterDomain))
                .extend('facebookMessages', fb.transform)
                .do(({ lead, facebookMessages }) =>
                    fb.sendMessages(lead.id, facebookMessages)))
        .do(...save.notifiedAllPlayersOfVoting);
};
