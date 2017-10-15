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
            text: 'Hermes welcomes you!\n\nSelect "Join a Game" to begin.',
        },
    },
    queue: {
        type: 'text',
        payload: {
            text: 'You have been added to the Queue. When it has 5 people we will start the game and let you know.',
        },
    },
    join: {
        type: 'text',
        payload: {
            text: 'A game has started Jill!\nYour adversaries are:\n\n - Jack\n - Jenn\n - Jim\n - Jess\n\n<Goal Card>',
        },
    },
    hand: {
        type: 'text',
        payload: {
            text: '<Hand Carousel>',
        },
    },
    pick: {
        type: 'text',
        payload: {
            text: 'You picked:\n\n<Picked Card>\n\nWe\'ll let you know when your adversaries have selected their candidates.',
        },
    },
    candidates: {
        type: 'text',
        payload: {
            text: '<Voting List>',
        },
    },
    vote: {
        type: 'text',
        payload: {
            text: 'Here are your votes:\n\n<Vote List>\n\nNow we wait for the votes and we\'ll let you know when they are in.',
        },
    },
    winner: {
        type: 'text',
        payload: {
            text: 'And the winner is…\n\n<Winner Card>\n\nAnd now the next goal...\n\n<Next Goal Card>',
        },
    },
    unknown: {
        type: 'text',
        payload: {
            text: 'No idea what you are doing!',
        },
    },
};
