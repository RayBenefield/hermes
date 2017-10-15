import list from './header-list';

export default ({ card: { contents } }) => list([
    {
        title: contents,
        image: 'http://b.basemaps.cartocdn.com/dark_all/11/604/771.png',
    },
    {
        title: '-',
        subtitle: '-',
    },
]);
