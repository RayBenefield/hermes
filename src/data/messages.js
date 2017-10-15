/* eslint-disable max-lines */
export default {
    text: {
        type: 'text',
        payload: {
            text: 'You are trying to text.',
        },
    },
    start: [
        {
            type: 'text',
            payload: {
                text: 'Hermes welcomes you!',
            },
        },
        {
            type: 'text',
            payload: {
                text: 'Select "Join a Game" to begin.',
            },
        },
    ],
    queue: {
        type: 'text',
        payload: {
            text: 'You have been added to the Queue. When it has 5 people we will start the game and let you know.',
        },
    },
    join: [
        {
            type: 'text',
            payload: {
                text: 'A game has started Jill!\nYour adversaries are:\n\n - Jack\n - Jenn\n - Jim\n - Jess',
            },
        },
        {
            type: 'text',
            payload: {
                text: '<Goal Card>',
            },
        },
    ],
    hand: {
        type: 'text',
        payload: {
            text: '<Hand Carousel>',
        },
    },
    pick: [
        {
            type: 'text',
            payload: {
                text: 'You picked:',
            },
        },
        {
            type: 'text',
            payload: {
                text: '<Picked Card>',
            },
        },
        {
            type: 'text',
            payload: {
                text: 'We\'ll let you know when your adversaries have selected their candidates.',
            },
        },
    ],
    candidates: {
        type: 'text',
        payload: {
            text: '<Voting List>',
        },
    },
    vote: [
        {
            type: 'text',
            payload: {
                text: 'Here are your votes:',
            },
        },
        {
            type: 'text',
            payload: {
                text: '<Vote List>',
            },
        },
        {
            type: 'text',
            payload: {
                text: 'Now we wait for the votes and we\'ll let you know when they are in.',
            },
        },
    ],
    winner: [
        {
            type: 'text',
            payload: {
                text: 'And the winner is…',
            },
        },
        {
            type: 'text',
            payload: {
                text: '<Winner Card>',
            },
        },
        {
            type: 'text',
            payload: {
                text: 'And now the next goal...',
            },
        },
        {
            type: 'text',
            payload: {
                text: '<Next Goal Card>',
            },
        },
    ],
    unknown: {
        type: 'text',
        payload: {
            text: 'No idea what you are doing!',
        },
    },
};
