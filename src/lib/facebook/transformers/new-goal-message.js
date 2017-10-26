import list from './header-list';

export default ({ game, round, card: { contents } }) => list([
    {
        title: contents,
        imageUrl: 'http://b.basemaps.cartocdn.com/dark_all/11/604/771.png',
        buttons: [
            {
                title: '🙏 Show Hand',
                type: 'postback',
                payload: `action: hand\npayload:\n game: ${game}\n round: ${round}`,
            },
        ],
    },
    {
        title: '🏆',
        subtitle: '🙋',
    },
]);
