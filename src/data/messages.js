/* eslint-disable max-lines */
export default {
    start: () => [
        {
            type: 'new-goal-message',
            payload: {
                card: {
                    contents: '________, the latest Facebook craze.',
                },
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
    candidates: () => [
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
