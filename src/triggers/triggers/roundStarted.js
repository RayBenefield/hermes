import transmute from 'transmutation';
import configureEntities from '../../domain/entities';

export default ({ db, fb }) => {
    const { get, save } = configureEntities({ db });

    return transmute()
        .extend(...get.game)
        .extend(...get.blackDeck)
        .extend(...get.card)
        .extend(...get.playersFromGame)
        .extend('messages', ({ round, game, card }) => [
            {
                type: 'new-goal-message',
                payload: { game, round, card },
            },
        ])
        .do(...save.roundForGame)
        .do(...save.goalForRound)
        .do(({ players, messages }) => Promise.all(
            players.map(lead => transmute({ lead, messages })
                .extend('facebookMessages', fb.transform)
                .do(({ facebookMessages }) =>
                    fb.sendMessages(lead.id, facebookMessages)))));
};
