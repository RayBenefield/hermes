/* eslint-disable max-lines */
export default {
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
                winner: { contents: '🏆 Being a motherfucking sorcerer.' },
                player: { firstName: '🙋 Jill' },
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
