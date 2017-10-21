import _ from 'lodash';
import transmute from 'transmutation';

export default ({ db, fb }) => transmute()
    .extend('messages', () => [
        {
            type: 'new-goal-message',
            payload: {
                card: { contents: '________, the latest Facebook craze.' },
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
