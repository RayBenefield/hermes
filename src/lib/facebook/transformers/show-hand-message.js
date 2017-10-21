import carousel from './carousel';

export default ({ cards }) => carousel(
    cards.map(({ id, contents }) => ({
        title: contents,
        image_url: 'http://homepages.neiu.edu/~whuang2/cs300/images/white.png',
        buttons: [
            {
                type: 'postback',
                title: 'Pick',
                payload: `action: pick\npayload: ${id}`,
            },
        ],
    }))
);
