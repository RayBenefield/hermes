import text from './text';
import list from './header-list';

export default ({ goal, winner, player }) => [
    text({ text: 'And the winner is…' }),
    list([
        {
            title: goal.contents,
            imageUrl: 'http://b.basemaps.cartocdn.com/dark_all/11/604/771.png',
        },
        {
            title: winner.contents,
            subtitle: `By: ${player.firstName}`,
            imageUrl: 'http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/1st-place-medal.png',
        },
    ]),
];
