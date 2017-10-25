import list from './list';

const medals = [
    'https://emojipedia-us.s3.amazonaws.com/thumbs/240/facebook/111/first-place-medal_1f947.png',
    'https://emojipedia-us.s3.amazonaws.com/thumbs/240/facebook/111/second-place-medal_1f948.png',
    'https://emojipedia-us.s3.amazonaws.com/thumbs/240/facebook/111/third-place-medal_1f949.png',
    'https://emojipedia-us.s3.amazonaws.com/thumbs/240/facebook/111/pile-of-poo_1f4a9.png',
];

export default ({ game, round, unranked = [], ranked = [] }) => list([].concat(...[
    ranked.map(({ contents }, rank) => ({
        title: contents,
        imageUrl: medals[rank],
    })),
    unranked.map(({ id, contents }) => ({
        title: contents,
        buttons: [
            {
                title: '🔘 Best',
                type: 'postback',
                payload: `action: vote\npayload:\n vote: ${id}\n round: ${round}\n game: ${game}`,
            },
        ],
    })),
]));
