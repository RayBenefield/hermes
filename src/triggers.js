import _ from 'lodash';
import uuid from 'uuid/v4';
import transmute from 'transmutation';

const hand = [
    { contents: 'Being a motherfucking sorcerer.' },
    { contents: 'Winking at old people.' },
    { contents: 'THE KOOL-AID MAN.' },
    { contents: 'Hurricane Katrina.' },
    { contents: 'Powerful thighs.' },
    { contents: 'Vigorous jazz hands.' },
    { contents: 'BEES?' },
    { contents: 'Morgan Freeman\'s voice.' },
    { contents: 'Racism.' },
    { contents: 'Daddy issues.' },
];

export default ({ db, fb }) => ({
    gameStarted: transmute()
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
            .map(p => db.set(`players/facebook/${p.id}/game`, game.id))))
        .do(({ game, payload: { players } }) => Promise.all(_.values(players)
            .map(p => db.set(`hands/${game.id}/${p.id}`, hand))))
        .do(({ game }) => {
            const id = uuid();
            return db.set(`rounds/${game.id}/${id}`, { id });
        }),
});
