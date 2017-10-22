import _ from 'lodash';
import transmute from 'transmutation';
import configureEntities from '../../domain/entities';
import blackDeck from '../../data/black-deck.json';

export default ({ db, fb }) => {
    const { get } = configureEntities({ db });

    return transmute()
        .extend(...get.game)
        .extend('card', () => blackDeck.sort(() => 0.5 - Math.random()).slice(0, 1)[0])
        .extend('messages', ({ round, game, card }) => [
            {
                type: 'new-goal-message',
                payload: { game, round, card },
            },
        ])
        .extend('leads', ({ game: { players } }) => _.values(players))
        .do(({ game, round }) => db.push(`games/${game.id}/rounds`, round.id))
        .do(({ game, round, card }) => db.set(`rounds/${game.id}/${round.id}/card`, card))
        .do(({ leads, messages }) => Promise.all(
            leads.map(lead => transmute({ lead, messages })
                .extend('facebookMessages', fb.transform)
                .do(({ facebookMessages }) =>
                    fb.sendMessages(lead.id, facebookMessages)))));
};
