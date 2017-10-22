import carousel from './carousel';

export default ({ game, round, cards }) => carousel(
    cards.map(({ id, contents }) => ({
        title: `🃏 ${contents}`,
        image_url: 'http://homepages.neiu.edu/~whuang2/cs300/images/white.png',
        buttons: [
            {
                type: 'postback',
                title: '🔘 Pick',
                payload: `action: pick\npayload:\n pick: ${id}\n game: ${game.id}\n round: ${round.id}`,
            },
        ],
    }))
);
