import _ from 'lodash';
import uuid from 'uuid/v4';
import transmute from 'transmutation';
import whiteDeck from '../../data/white-deck.json';

export default ({ db, fb }) => transmute()
    .extend('messages', ({ payload }) => [
        {
            type: 'game-started-message',
            payload,
        },
    ])
    .extend('leads', ({ payload: { players, notified_players: notified } }) =>
        _.values(players).filter(({ id }) => !(id in notified)))
    .do(({ leads, messages: rawMessages }) => Promise.all(
        leads.map((lead) => {
            const facebookMessages = fb.transform({ lead, messages: rawMessages });
            return fb.sendMessages(lead.id, facebookMessages);
        })))
    .do(({ game, payload: { players } }) =>
        db.set(`games/${game.id}/notified_players`, players))
    .do(({ game, payload: { players } }) => Promise.all(_.values(players)
        .map(p => db.set(`players/facebook/${p.id}/games/${game.id}`))))
    .do(({ game, payload: { players } }) => Promise.all(_.values(players)
        .map(p => ({ player: p }))
        .map(p => ({ ...p, hand: whiteDeck.sort(() => 0.5 - Math.random()).slice(0, 10) }))
        .map(({ player, hand }) => ({
            player,
            hand: hand.reduce((h, c) => Object.assign(h, { [c.id]: c }), {}),
        }))
        .map(({ player, hand }) => db.set(`hands/${game.id}/${player.id}`, {
            game: game.id,
            player: player.id,
            cards: hand,
        }))))
    .do(({ game }) => {
        const id = uuid();
        return db.set(`rounds/${game.id}/${id}`, { id, game: game.id });
    });
