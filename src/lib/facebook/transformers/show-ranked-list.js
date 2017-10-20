import _ from 'lodash';
import list from './list';

const medals = [
    'http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/1st-place-medal.png',
    'http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/2nd-place-medal.png',
    'http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/3rd-place-medal.png',
    'http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/pile-of-poo.png',
];

export default ({ unranked = [], ranked = [] }) => list(_.flatten([
    ranked.map(({ contents }, rank) => ({
        title: contents,
        imageUrl: medals[rank],
    })),
    unranked.map(({ contents }) => ({
        title: contents,
        buttons: [
            {
                title: 'Best',
                type: 'postback',
                payload: 'action: vote',
            },
        ],
    })),
]));
