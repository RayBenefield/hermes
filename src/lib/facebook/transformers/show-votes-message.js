import text from './text';
import list from './show-ranked-list';

export default ({ ranked }) => [
    text({ text: 'Here are your votes:' }),
    list({ ranked }),
];
