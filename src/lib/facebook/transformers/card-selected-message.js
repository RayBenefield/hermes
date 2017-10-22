import text from './text';
import card from './card';

export default ({ card: pick }) => [
    text({ text: 'You picked:' }),
    card({
        title: `🃏 ${pick.contents}`,
        image: 'http://homepages.neiu.edu/~whuang2/cs300/images/white.png',
    }),
];
