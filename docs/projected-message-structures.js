/* eslint-disable max-lines */
export default {
    start: [
        {
            type: 'WelcomeMessage',
        },
    ],
    queue: [
        {
            type: 'QueueJoinedMessage',
            payload: {
                numberOfPeople: 3,
            },
        },
    ],
    join: [
        {
            type: 'GameStartedMessage',
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
            type: 'NewGoalMessage',
            payload: {
                card: {
                    type: 'black',
                    contents: '________, the latest Facebook craze.',
                },
            },
        },
    ],
    hand: {
        type: 'HandMessage',
        payload: [
            {
                pickableCards: [],
                newCards: [],
                replaceableCards: [],
                oldCards: [],
                cards: [
                    {
                        type: 'white',
                        contents: 'Being a motherfucking sorcerer.',
                    },
                    {
                        type: 'white',
                        contents: 'Winking at old people.',
                    },
                    {
                        type: 'white',
                        contents: 'THE KOOL-AID MAN.',
                    },
                    {
                        type: 'white',
                        contents: 'Hurricane Katrina.',
                    },
                    {
                        type: 'white',
                        contents: 'Powerful thighs.',
                    },
                    {
                        type: 'white',
                        contents: 'Vigorous jazz hands.',
                    },
                    {
                        type: 'white',
                        contents: 'BEES?',
                    },
                    {
                        type: 'white',
                        contents: 'Morgan Freeman\'s voice.',
                    },
                    {
                        type: 'white',
                        contents: 'Racism.',
                    },
                    {
                        type: 'white',
                        contents: 'Daddy issues.',
                    },
                ],
            },
        ],
    },
    pick: [
        {
            type: 'CardSelectedMessage',
            payload: {
                card: '<card-id>',
                goal: '<goal-id>',
                slot: '<slot-id>',
            },
        },
        {
            type: 'SubmittedCandidateMessage',
            payload: {
                candidate: {
                    goal: '<goal-id>',
                    cards: [
                        {
                            card: '<card-id>',
                            slot: '<slot-id>',
                        },
                    ],
                },
            },
        },
        {
            type: 'WaitForPlayersMessage',
            payload: {
                candidates: [],
            },
        },
    ],
    candidates: {
        type: 'ShowRankedListMessage',
        payload: {
            unrankedCards: [],
            rankedCards: [],
        },
    },
    vote: [
        {
            type: 'ShowFinalVotesMessage',
            payload: [],
        },
        {
            type: 'WaitingForOtherVotesMessage',
            payload: {
                voteLists: [],
            },
        },
    ],
    winner: [
        {
            type: 'ShowWinnerMessage',
            payload: {
                goal: {},
            },
        },
        {
            type: 'NewGoalMessage',
            payload: {
                card: {
                    type: 'black',
                    contents: '________, the latest Facebook craze.',
                },
            },
        },
    ],
};
