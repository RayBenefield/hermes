import _ from 'lodash';
import transmute from 'transmutation';
import blackDeck from '../../data/black-deck.json';

export default ({ db, fb }) => transmute()
    .extend('goal', () => blackDeck.sort(() => 0.5 - Math.random()).slice(0, 1)[0])
    .extend('messages', ({ goal }) => [
        {
            type: 'new-goal-message',
            payload: {
                card: goal,
            },
        },
    ])
    .extend('game', ({ game: { id } }) => db.get(`games/${id}`))
    .extend('leads', ({ game: { players } }) => _.values(players))
    .do(({ leads, messages: rawMessages }) => Promise.all(
        leads.map((lead) => {
            const facebookMessages = fb.transform({ lead, messages: rawMessages });
            return fb.sendMessages(lead.id, facebookMessages);
        })));
