/* eslint-disable max-lines */
export default {
    start: [
        {
            type: 'welcome-message',
        },
        {
            type: 'instructions-message',
        },
    ],
    queue: [
        {
            type: 'queue-joined-message',
            payload: {
                numberOfPeople: 3,
            },
        },
    ],
    join: [
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
    hand: [
        {
            type: 'carousel',
            payload: [
                {
                    title: 'Being a motherfucking sorcerer.',
                    image: 'http://homepages.neiu.edu/~whuang2/cs300/images/white.png',
                },
                {
                    title: 'Winking at old people.',
                    image: 'http://homepages.neiu.edu/~whuang2/cs300/images/white.png',
                },
                {
                    title: 'THE KOOL-AID MAN.',
                    image: 'http://homepages.neiu.edu/~whuang2/cs300/images/white.png',
                },
                {
                    title: 'Hurricane Katrina.',
                    image: 'http://homepages.neiu.edu/~whuang2/cs300/images/white.png',
                },
                {
                    title: 'Powerful thighs.',
                    image: 'http://homepages.neiu.edu/~whuang2/cs300/images/white.png',
                },
                {
                    title: 'Vigorous jazz hands.',
                    image: 'http://homepages.neiu.edu/~whuang2/cs300/images/white.png',
                },
                {
                    title: 'BEES?',
                    image: 'http://homepages.neiu.edu/~whuang2/cs300/images/white.png',
                },
                {
                    title: 'Morgan Freeman\'s voice.',
                    image: 'http://homepages.neiu.edu/~whuang2/cs300/images/white.png',
                },
                {
                    title: 'Racism.',
                    image: 'http://homepages.neiu.edu/~whuang2/cs300/images/white.png',
                },
                {
                    title: 'Daddy issues.',
                    image: 'http://homepages.neiu.edu/~whuang2/cs300/images/white.png',
                },
            ],
        },
    ],
    pick: [
        {
            type: 'text',
            payload: {
                text: 'You picked:',
            },
        },
        {
            type: 'card',
            payload: {
                title: 'Being a motherfucking sorcerer.',
                image: 'http://homepages.neiu.edu/~whuang2/cs300/images/white.png',
            },
        },
        {
            type: 'text',
            payload: {
                text: 'We\'ll let you know when your adversaries have selected their candidates.',
            },
        },
    ],
    candidates: [
        {
            type: 'list',
            payload: [
                {
                    title: 'Vigorous jazz hands',
                    buttons: [
                        {
                            title: 'Best',
                            type: 'postback',
                            payload: 'vote',
                        },
                    ],
                },
                {
                    title: 'Centaur Porn',
                    buttons: [
                        {
                            title: 'Best',
                            type: 'postback',
                            payload: 'vote',
                        },
                    ],
                },
                {
                    title: 'Your Face',
                    buttons: [
                        {
                            title: 'Best',
                            type: 'postback',
                            payload: 'vote',
                        },
                    ],
                },
                {
                    title: 'Barack Obama',
                    buttons: [
                        {
                            title: 'Best',
                            type: 'postback',
                            payload: 'vote',
                        },
                    ],
                },
            ],
        },
    ],
    vote: [
        {
            type: 'text',
            payload: {
                text: 'Here are your votes:',
            },
        },
        {
            type: 'list',
            payload: [
                {
                    title: 'Vigorous jazz hands',
                    image: 'http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/1st-place-medal.png',
                },
                {
                    title: 'Centaur Porn',
                    image: 'http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/2nd-place-medal.png',
                },
                {
                    title: 'Your Face',
                    image: 'http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/3rd-place-medal.png',
                },
                {
                    title: 'Barack Obama',
                    subtitle: 'Loser',
                },
            ],
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
            type: 'header-list',
            payload: [
                {
                    title: '________, the latest Facebook craze.',
                    image: 'http://b.basemaps.cartocdn.com/dark_all/11/604/771.png',
                },
                {
                    title: 'Being a motherfucking sorcerer.',
                    subtitle: 'By: Jill (YOU)',
                    image: 'http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/1st-place-medal.png',
                },
            ],
        },
        {
            type: 'text',
            payload: {
                text: 'And now the next goal...',
            },
        },
        {
            type: 'header-list',
            payload: [
                {
                    title: 'How am I maintaining my relationship status?',
                    image: 'http://b.basemaps.cartocdn.com/dark_all/11/604/771.png',
                },
                {
                    title: '<Winner here>',
                    subtitle: '<Winner here>',
                },
            ],
        },
    ],
};
