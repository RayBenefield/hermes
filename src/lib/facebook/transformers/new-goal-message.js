import list from './header-list';

export default ({ card: { contents } }) => list([
    {
        title: contents,
        imageUrl: 'http://b.basemaps.cartocdn.com/dark_all/11/604/771.png',
        buttons: [
            {
                title: 'Show Hand',
                type: 'postback',
                payload: 'action: hand',
            },
        ],
    },
    {
        title: '🏆',
        subtitle: '🙋',
    },
]);
