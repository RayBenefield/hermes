import text from './text';
import card from './card';

export default ({ card: pick }) => [
    text({ text: 'You already picked:' }),
    card({
        title: `🃏 ${pick.contents}`,
        image: 'http://homepages.neiu.edu/~whuang2/cs300/images/white.png',
    }),
    text({ text: 'We\'ll let you know when your adversaries have selected their candidates.' }),
];
