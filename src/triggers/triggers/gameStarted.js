import _ from 'lodash';
import uuid from 'uuid/v4';
import transmute from 'transmutation';
import whiteDeck from '../../data/white-deck.json';

export default ({ db, fb }) => transmute()
    .extend('messages', ({ game }) => [
        {
            type: 'game-started-message',
            payload: game,
        },
    ])
    .extend('leads', ({ game: { players, notified_players: notified } }) =>
        _.values(players).filter(({ id }) => !(id in notified)))
    .do(({ leads, messages }) => Promise.all(
        leads.map(lead => transmute({ lead, messages })
            .extend('facebookMessages', fb.transform)
            .do(({ facebookMessages }) =>
                fb.sendMessages(lead.id, facebookMessages)))))
    .do(({ game: { id, players } }) =>
        db.set(`games/${id}/notified_players`, players))
    .do(({ game: { id, players } }) => Promise.all(_.values(players)
        .map(player =>
            db.set(`players/facebook/${player.id}/games/${id}`))))
    .do(({ game: { id, players } }) => Promise.all(_.values(players)
        .map(p => ({ player: p }))
        .map(p => ({ ...p, hand: whiteDeck.sort(() => 0.5 - Math.random()).slice(0, 10) }))
        .map(({ player, hand }) => ({
            player,
            hand: hand.reduce((h, c) => Object.assign(h, { [c.id]: c }), {}),
        }))
        .map(({ player, hand }) => db.set(`hands/${id}/${player.id}`, {
            game: id,
            player: player.id,
            cards: hand,
        }))))
    .do(({ game }) => {
        const id = uuid();
        return db.set(`rounds/${game.id}/${id}`, { id, game: game.id });
    });
