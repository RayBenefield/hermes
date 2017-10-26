/* eslint-disable max-lines */
export default {
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
