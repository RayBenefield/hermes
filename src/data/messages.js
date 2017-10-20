/* eslint-disable max-lines */
export default {
    queue: () => [
        {
            type: 'queue-joined-message',
            payload: {
                numberOfPeople: 3,
            },
        },
    ],
    join: () => [
        {
            type: 'game-started-message',
            payload: {
                player: 'Jill',
                players: [
                    'Jack',
                    'Jenn',
                    'Jim',
                    'Jess',
                ],
            },
        },
        {
            type: 'new-goal-message',
            payload: {
                card: {
                    contents: '________, the latest Facebook craze.',
                },
            },
        },
    ],
    hand: () => [
        {
            type: 'show-hand-message',
            payload: {
                cards: [
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
                ],
            },
        },
    ],
    pick: () => [
        {
            type: 'card-selected-message',
            payload: {
                contents: 'Being a motherfucking sorcerer.',
            },
        },
    ],
    candidates: [
        {
            type: 'show-ranked-list',
            payload: {
                ranked: [
                    { contents: 'Vigorous jazz hands' },
                    { contents: 'Centaur Porn' },
                ],
                unranked: [
                    { contents: 'Your Face' },
                    { contents: 'Barack Obama' },
                ],
            },
        },
    ],
    vote: () => [
        {
            type: 'show-votes-message',
            payload: {
                ranked: [
                    { contents: 'Vigorous jazz hands' },
                    { contents: 'Centaur Porn' },
                    { contents: 'Your Face' },
                    { contents: 'Barack Obama' },
                ],
            },
        },
        {
            type: 'wait-for-votes-message',
            payload: {
                numberOfPeople: 2,
            },
        },
    ],
    winner: () => [
        {
            type: 'show-winner-message',
            payload: {
                goal: { contents: '________, the latest Facebook craze.' },
                winner: { contents: 'Being a motherfucking sorcerer.' },
                player: { firstName: 'Jill' },
            },
        },
        {
            type: 'show-next-goal-message',
            payload: {
                card: {
                    contents: 'How am I maintaining my relationship status?',
                },
            },
        },
    ],
};
