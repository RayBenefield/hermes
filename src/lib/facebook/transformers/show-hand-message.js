import _ from 'lodash';
import carousel from './carousel';

export default ({ cards }) => carousel(
    _.values(cards).map(({ contents }) => ({
        title: `🃏 ${contents}`,
        image_url: 'http://homepages.neiu.edu/~whuang2/cs300/images/white.png',
    }))
);
