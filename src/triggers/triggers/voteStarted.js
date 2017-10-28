import transmute from 'transmutation';
import { services, setupEntities } from '../../domain';

export default ({ db, fb }) => {
    const { get, save } = setupEntities({ db });

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
                    .switch('action', services))
                .extend('facebookMessages', fb.transform)
                .do(({ lead, facebookMessages }) =>
                    fb.sendMessages(lead.id, facebookMessages)))
        .do(...save.notifiedAllPlayersOfVoting);
};
