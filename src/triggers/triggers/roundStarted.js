import transmute from 'transmutation';
import configureEntities from '../../domain/entities';

export default ({ db, fb }) => {
    const { get } = configureEntities({ db });

    return transmute()
        .extend(...get.game)
        .extend(...get.blackDeck)
        .extend(...get.card)
        .extend(...get.players)
        .extend('messages', ({ round, game, card }) => [
            {
                type: 'new-goal-message',
                payload: { game, round, card },
            },
        ])
        .do(({ game, round }) => db.push(`games/${game.id}/rounds`, round.id))
        .do(({ game, round, card }) => db.set(`rounds/${game.id}/${round.id}/card`, card))
        .do(({ players, messages }) => Promise.all(
            players.map(lead => transmute({ lead, messages })
                .extend('facebookMessages', fb.transform)
                .do(({ facebookMessages }) =>
                    fb.sendMessages(lead.id, facebookMessages)))));
};
