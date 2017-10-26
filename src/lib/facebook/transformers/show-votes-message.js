import text from './text';
import list from './show-ranked-list';

export default payload => [
    text({ text: 'Here are your votes:' }),
    list(payload),
];
