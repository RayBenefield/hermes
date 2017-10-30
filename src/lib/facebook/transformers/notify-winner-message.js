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
            title: `🏆 ${winner.contents}`,
            subtitle: `By: 🙋 ${player.first_name}`,
            imageUrl: 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/facebook/111/first-place-medal_1f947.png',
        },
    ]),
];
