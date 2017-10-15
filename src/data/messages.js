/* eslint-disable max-lines */
export default {
    text: {
        type: 'text',
        payload: {
            text: 'You are trying to text.',
        },
    },
    start: {
        type: 'text',
        payload: {
            text: 'Welcome good sir, thank you for starting.',
        },
    },
    queue: {
        type: 'text',
        payload: {
            text: 'We\'ve added you to the queue.',
        },
    },
    join: {
        type: 'text',
        payload: {
            text: 'We set you up in a game.',
        },
    },
    hand: {
        type: 'text',
        payload: {
            text: 'Here\'s your hand.',
        },
    },
    pick: {
        type: 'text',
        payload: {
            text: 'Good choice.',
        },
    },
    candidates: {
        type: 'text',
        payload: {
            text: 'Here are the candidates.',
        },
    },
    vote: {
        type: 'text',
        payload: {
            text: 'We hope you win.',
        },
    },
    winner: {
        type: 'text',
        payload: {
            text: 'You are the winner.',
        },
    },
    unknown: {
        type: 'text',
        payload: {
            text: 'No idea what you are doing!',
        },
    },
};
